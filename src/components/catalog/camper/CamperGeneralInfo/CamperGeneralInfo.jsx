import Button from '../../Button/Button.jsx';
import css from './CamperGeneralInfo.module.css';
import icons from '@src/assets/sprite.svg';

export default function CamperGeneralInfo({
  name,
  price,
  rating,
  reviews,
  location,
  description,
}) {
  return (
    <div className={css.camperGeneralInfo}>
      <div className={css.camperHeading}>
        <h3 className={css.camperName}>{name}</h3>
        <p className={css.camperPrice}>€{price}.00</p>
        <Button className={css.favouriteButton} noBaseStyles>
          <svg width="26" height="24">
            <use href={`${icons}#icon_heart`}></use>
          </svg>
        </Button>
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
    </div>
  );
}
