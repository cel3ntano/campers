import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';
import Button from '../../Button/Button.jsx';
import css from './CamperGeneralInfo.module.css';
import icons from '@src/assets/sprite.svg';
import { toggleFavorite } from '../../../../redux/favourites/slice.js';

export default function CamperGeneralInfo({
  id,
  name,
  price,
  rating,
  reviews,
  location,
  className,
  variant = 'default',
  showFavoriteButton = true,
}) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state => state.favorites.items.includes(id));

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className={clsx(css.CamperGeneralInfo, css[variant], className)}>
      <div className={css.camperHeading}>
        <h3 className={css.camperName}>{name}</h3>
        {variant === 'default' && (
          <p className={css.camperPrice}>€{`${price.toFixed(2)}`}</p>
        )}
        {showFavoriteButton && (
          <Button
            className={css.favouriteButton}
            noBaseStyles
            onClick={handleFavoriteClick}
          >
            <svg
              width="26"
              height="24"
              className={clsx(isFavorite && css.favorite)}
            >
              <use href={`${icons}#icon_heart`}></use>
            </svg>
          </Button>
        )}
      </div>
      <div className={css.camperMetaData}>
        <p className={css.reviews}>
          <svg className={css.starIcon} width="16" height="16">
            <use href={`${icons}#icon_star`}></use>
          </svg>
          {rating} ({reviews?.length} Reviews)
        </p>
        <p>
          <svg className={css.locationIcon} width="16" height="16">
            <use href={`${icons}#icon_map`}></use>
          </svg>
          {location?.split(',').reverse().join(', ')}
        </p>
      </div>
      {variant === 'details' && (
        <p className={css.camperPrice}>€{`${price.toFixed(2)}`}</p>
      )}
    </div>
  );
}
