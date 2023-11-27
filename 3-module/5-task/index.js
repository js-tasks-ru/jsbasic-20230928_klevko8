function getMinMax(str) {
  let values = str.split(' ').filter(item => isFinite(item));
  return {
    min: Math.min(...values),
    max: Math.max(...values)
  };
}
