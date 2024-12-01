import css from './CampersFilters.module.css';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import icons from '@src/assets/sprite.svg';
import { iconMap } from '../../../helpers/iconMap.js';
import Button from '../Button/Button.jsx';
import clsx from 'clsx';
import { locations } from '../../../helpers/locations.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../../redux/filters/slice.js';
import { clearCampers } from '../../../redux/campers/slice.js';
import { fetchCampers } from '../../../redux/campers/operations.js';
import { VEHICLE_TYPE_MAP } from '../../../helpers/vehicleTypeMap.js';
export default function CampersFilters() {
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLocationInput = e => {
    const value = e.target.value;
    if (value.length > 0) {
      const filtered = locations.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowDropdown(true);
    } else {
      setFilteredLocations([]);
      setShowDropdown(false);
    }
  };

  const handleLocationSelect = location => {
    setValue('location', location);
    setShowDropdown(false);
  };

  const validateFiltersSchema = Yup.object().shape({
    location: Yup.string().test(
      'is-valid-or-empty',
      'Please enter a valid city name (letters and hyphens only)',
      value => !value || /^[A-Za-z-]+$/.test(value)
    ),
  });

  const equipmentIcons = [
    { id: 'AC', name: 'AC' },
    { id: 'TV', name: 'TV' },
    { id: 'bathroom', name: 'Bathroom' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'gas', name: 'Gas' },
    { id: 'transmission', name: 'Automatic' },
  ].map(icon => ({
    ...icon,
    iconId: iconMap[icon.id],
  }));

  const vehicleTypes = [
    { id: 'van', label: 'Van' },
    { id: 'fullyIntegrated', label: 'Fully integrated' },
    { id: 'alcove', label: 'Alcove' },
  ].map(type => ({
    ...type,
    iconId: iconMap[type.id],
  }));

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: '',
      AC: false,
      TV: false,
      bathroom: false,
      kitchen: false,
      gas: false,
      transmission: false,
      vehicleType: '',
    },
    resolver: yupResolver(validateFiltersSchema),
    mode: 'onSubmit',
  });

  const defaultValues = {
    location: '',
    form: '',
    AC: false,
    TV: false,
    bathroom: false,
    kitchen: false,
    gas: false,
    transmission: false,
  };

  const onSubmit = data => {
    const filters = {
      location: data.location || defaultValues.location,
      form: data.vehicleType
        ? VEHICLE_TYPE_MAP[data.vehicleType]
        : defaultValues.form,
      transmission:
        data.transmission === true ? 'automatic' : defaultValues.transmission,
    };

    const equipmentFields = ['AC', 'TV', 'bathroom', 'kitchen', 'gas'];
    equipmentFields.forEach(field => {
      filters[field] = data[field] === true ? true : defaultValues[field];
    });

    dispatch(clearCampers());
    dispatch(setFilters(filters));
    dispatch(fetchCampers({ filters, page: 1, showToast: true }));
    reset();
  };

  return (
    <div className={css.campersFiltersWrapper}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.locationWrapper}>
          <label htmlFor="location" className={css.locationLabel}>
            Location
          </label>
          <div className={css.locationInputWrapper}>
            <input
              id="location"
              placeholder="Kyiv, Ukraine"
              className={css.locationInput}
              {...register('location')}
              onChange={handleLocationInput}
              autoComplete="off"
            />
            <svg className={css.locationIcon} width="20" height="20">
              <use href={`${icons}#icon_map`}></use>
            </svg>
            {showDropdown && filteredLocations.length > 0 && (
              <ul className={css.locationsDropdown}>
                {filteredLocations.map(location => (
                  <li
                    key={location}
                    className={css.locationOption}
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.location && (
            <p className={css.errorText}>{errors.location.message}</p>
          )}
        </div>

        <h3 className={css.filtersTitle}>Filters</h3>
        <div className={css.equipmentFilters}>
          <p className={css.filterLabel}>Vehicle equipment</p>
          <div className={css.filterOptionsGrid}>
            {equipmentIcons.map(({ id, name, iconId }) => (
              <label key={id} className={css.filterOption}>
                <input
                  type="checkbox"
                  className={css.filterInputElement}
                  {...register(id)}
                />
                <div className={css.filterOptionButton}>
                  <svg className={css.icon} width="32" height="32">
                    <use href={`${icons}#${iconId}`} />
                  </svg>
                  <span className={css.iconLabel}>{name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className={css.typeFilters}>
          <p className={css.filterLabel}>Vehicle Type</p>
          <div className={css.filterOptionsGrid}>
            {vehicleTypes.map(({ id, label, iconId }) => (
              <label key={id} className={css.filterOption}>
                <input
                  type="radio"
                  name="vehicleType"
                  value={id}
                  className={css.filterInputElement}
                  {...register('vehicleType')}
                />
                <div className={css.filterOptionButton}>
                  <svg className={css.icon} width="32" height="32">
                    <use href={`${icons}#${iconId}`} />
                  </svg>
                  <span className={css.iconLabel}>{label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
        <Button className={clsx(css.button, css.searchButton)} type={'submit'}>
          Search
        </Button>
      </form>
    </div>
  );
}
