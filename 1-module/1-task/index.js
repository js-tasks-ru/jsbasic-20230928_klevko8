function factorial(n) {
  let result = 1;
  while (n) {
    result = result * n;
    n = n - 1;
  }
  return result;
}
