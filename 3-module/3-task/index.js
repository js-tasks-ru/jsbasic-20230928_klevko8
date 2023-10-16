function camelize(str) {
  let words = str.split('-');
  let result = words.map((item, index) => index === 0 ? item : item[0].toUpperCase() + item.slice(1));
  return result.join('');
}
