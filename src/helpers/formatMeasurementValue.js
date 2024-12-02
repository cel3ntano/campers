export const formatMeasurementValue = value => {
  if (!value) return '';

  const consumptionMatch = value.match(/^([\d.]+)l\/(\d+)km$/);
  if (consumptionMatch) {
    const [, number, distance] = consumptionMatch;
    return `${number} l / ${distance} km`;
  }

  const regularMatch = value.match(/^([\d.]+)(\w+)$/);
  if (regularMatch) {
    const [, number, unit] = regularMatch;
    return `${number} ${unit}`;
  }

  return value;
};
