import { useDispatch } from 'react-redux';
import CampersFilters from '../../components/catalog/CampersFilters/CampersFilters.jsx';
import CampersList from '../../components/catalog/CampersList/CampersList.jsx';
import css from './Catalog.module.css';
import { fetchCampers } from '../../redux/campers/operations.js';
import { useEffect } from 'react';

export default function Catalog() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  return (
    <div className={`${css.catalogPage} container`}>
      <CampersFilters />
      <CampersList />
    </div>
  );
}
