import CamperEquipment from '../catalog/camper/CamperEquipment/CamperEquipment.jsx';
import css from './Features.module.css';
import { useSelector } from 'react-redux';
import { selectCamperDetails } from '../../redux/campers/selectors.js';

export default function Features() {
  const camperDetails = useSelector(selectCamperDetails) || {};
  const { form, length, width, height, tank, consumption } = camperDetails;

  return (
    <div className={css.camperFeatures}>
      <div className={css.camperEquipment}>
        <CamperEquipment camperDetails={camperDetails} />
      </div>
      <div className={css.camperDetails}>
        <h3>Vehicle Details</h3>
        <dl className={css.detailsList}>
          <div>
            <dt>Form</dt>
            <dd>{form}</dd>
          </div>
          <div>
            <dt>Length</dt>
            <dd>{length}</dd>
          </div>
          <div>
            <dt>Width</dt>
            <dd>{width}</dd>
          </div>
          <div>
            <dt>Height</dt>
            <dd>{height}</dd>
          </div>
          <div>
            <dt>Tank</dt>
            <dd>{tank}</dd>
          </div>
          <div>
            <dt>Consumption</dt>
            <dd>{consumption}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
