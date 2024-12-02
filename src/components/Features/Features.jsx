import CamperEquipment from '../catalog/camper/CamperEquipment/CamperEquipment.jsx';
import css from './Features.module.css';
import { useSelector } from 'react-redux';
import { selectCamperDetails } from '../../redux/campers/selectors.js';
import { formatMeasurementValue } from '../../helpers/formatMeasurementValue.js';
import { formatVehicleType } from '../../helpers/vehicleTypeMap.js';

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
            <dd>{formatVehicleType(form)}</dd>
          </div>
          <div>
            <dt>Length</dt>
            <dd>{formatMeasurementValue(length)}</dd>
          </div>
          <div>
            <dt>Width</dt>
            <dd>{formatMeasurementValue(width)}</dd>
          </div>
          <div>
            <dt>Height</dt>
            <dd>{formatMeasurementValue(height)}</dd>
          </div>
          <div>
            <dt>Tank</dt>
            <dd>{formatMeasurementValue(tank)}</dd>
          </div>
          <div>
            <dt>Consumption</dt>
            <dd>{formatMeasurementValue(consumption)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
