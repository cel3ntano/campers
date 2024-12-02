export const VEHICLE_TYPE_MAP = {
  van: 'panelTruck',
  fullyIntegrated: 'fullyIntegrated',
  alcove: 'alcove',
};

export const formatVehicleType = type => {
  if (!type) return '';

  const mappedType = VEHICLE_TYPE_MAP[type] || type;

  switch (mappedType) {
    case 'panelTruck':
      return 'Van';
    case 'fullyIntegrated':
      return 'Fully integrated';
    case 'alcove':
      return 'Alcove';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
};
