function ucFirst(str) {
  if (!str) {
    return str;
  }

  const capitalLetter = str[0].toUpperCase();
  const smallLetters = str.slice(1);

  return capitalLetter + smallLetters;
}
