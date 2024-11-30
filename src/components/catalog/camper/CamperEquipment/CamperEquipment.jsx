import React from 'react';
import icons from '@src/assets/sprite.svg';
import css from './CamperEquipment.module.css';

export default function CamperEquipment({ camperDetails }) {
  const iconMap = {
    AC: 'icon_equip_ac',
    TV: 'icon_equip_tv',
    bathroom: 'icon_equip_bathroom',
    engine: 'icon_equip_engine',
    gas: 'icon_equip_gas',
    kitchen: 'icon_equip_kitchen',
    microwave: 'icon_equip_microwave',
    radio: 'icon_equip_radio',
    refrigerator: 'icon_equip_refrigerator',
    water: 'icon_equip_water',
    transmission: 'icon_equip_transmission',
  };

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
            <p>'{label.value}'</p>
          )}
          <p>{label.name}</p>
        </li>
      ))}
    </ul>
  );
}
