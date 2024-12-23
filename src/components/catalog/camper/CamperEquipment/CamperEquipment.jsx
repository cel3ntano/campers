import icons from '@src/assets/sprite.svg';
import css from './CamperEquipment.module.css';
import { iconMap } from '../../../../helpers/iconMap.js';

export default function CamperEquipment({ camperDetails }) {
  const activeProperties = Object.keys(camperDetails ?? {}).filter(key => {
    const value = camperDetails?.[key];
    return value === true || value;
  });

  const labels = activeProperties
    .map(property => {
      const value = camperDetails?.[property];
      let iconId = iconMap[property];

      if (property === 'engine' || property === 'transmission') {
        return {
          name: value.charAt(0).toUpperCase() + value.slice(1),
          iconId: iconId,
        };
      }

      if (iconId) {
        return {
          name:
            property.length === 2
              ? property.toUpperCase()
              : property.charAt(0).toUpperCase() + property.slice(1),
          iconId,
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <ul className={css.equipmentLabelsList}>
      {labels.map((label, idx) => (
        <li key={idx} className={css.labelItem}>
          {label.iconId ? (
            <svg width="20" height="20" className={css.equipmentIcon}>
              <use href={`${icons}#${label.iconId}`} />
            </svg>
          ) : (
            <p>{label.value}</p>
          )}
          <p>{label.name}</p>
        </li>
      ))}
    </ul>
  );
}
