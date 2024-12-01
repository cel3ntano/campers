import { Link } from 'react-router-dom';
import CamperDescription from '../camper/CamperDescription/CamperDescription.jsx';
import CamperEquipment from '../camper/CamperEquipment/CamperEquipment.jsx';
import CamperGeneralInfo from '../camper/CamperGeneralInfo/CamperGeneralInfo.jsx';
import CamperImage from '../camper/CamperImage/CamperImage.jsx';
import css from './CamperItem.module.css';
import React from 'react';

const CamperItem = React.memo(function CamperItem({
  id,
  name,
  price,
  rating,
  reviews,
  gallery = [],
  location,
  description,
  ...camperDetails
}) {
  const thumbnailImage = gallery[0]?.thumb || null;

  return (
    <li className={css.camperItem}>
      <CamperImage image={thumbnailImage} alt={name} />
      <div className={css.camperItemInfo}>
        <div className={css.camperGeneralInfo}>
          <CamperGeneralInfo
            {...{ id, price, rating, location, reviews, name }}
          />
        </div>
        <div className={css.camperDescription}>
          <CamperDescription description={description} />
        </div>
        <div className={css.camperEquipment}>
          <CamperEquipment camperDetails={camperDetails} />
        </div>
        <Link
          to={`${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`link ${css.camperItemLink}`}
        >
          Show More
        </Link>
      </div>
    </li>
  );
});

export default CamperItem;
