import clsx from 'clsx';
import Button from '../../Button/Button.jsx';
import css from './CamperGeneralInfo.module.css';
import icons from '@src/assets/sprite.svg';

export default function CamperGeneralInfo({
  name,
  price,
  rating,
  reviews,
  location,
  className,
  variant = 'default',
  showFavoriteButton = true,
}) {
  return (
    <div className={clsx(css.CamperGeneralInfo, css[variant], className)}>
      <div className={css.camperHeading}>
        <h3 className={css.camperName}>{name}</h3>
        {variant === 'default' && <p className={css.camperPrice}>€{price}</p>}
        {showFavoriteButton && (
          <Button className={css.favouriteButton} noBaseStyles>
            <svg width="26" height="24">
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
      {variant === 'details' && <p className={css.camperPrice}>€{price}</p>}
    </div>
  );
}
