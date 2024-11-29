import { Link } from 'react-router-dom';
import CamperDescription from '../camper/CamperDescription/CamperDescription.jsx';
import CamperEquipment from '../camper/CamperEquipment/CamperEquipment.jsx';
import CamperGeneralInfo from '../camper/CamperGeneralInfo/CamperGeneralInfo.jsx';
import CamperImage from '../camper/CamperImage/CamperImage.jsx';
import css from './CamperItem.module.css';

export default function CamperItem({
  id,
  name,
  price,
  rating,
  reviews,
  gallery = [],
  location,
  description,
  ...camperDeatils
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
          <CamperDescription />
        </div>
        <div className={css.camperEquipment}>
          <CamperEquipment camperDeatils={camperDeatils} />
        </div>
        <Link className={css.camperDetailsLink}>Show More</Link>
      </div>
    </li>
  );
}
