import css from './CampersList.module.css';
import CamperItem from '../CamperItem/CamperItem.jsx';
import { useSelector } from 'react-redux';
import { selectCampers } from '../../../redux/campers/selectors.js';

export default function CampersList() {
  const campersList = useSelector(selectCampers) ?? [];

  return (
    <ul className={css.campersList}>
      {campersList.map(camper => (
        <CamperItem key={camper.id} {...camper} />
      ))}
    </ul>
  );
}
