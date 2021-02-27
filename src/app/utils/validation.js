export const checkCPF = str => {
  const mod11 = num => num % 11;
  const NOT = x => !x;
  const isEqual = a => b => b === a;
  const mergeDigits = (num1, num2) => `${num1}${num2}`;
  const getTwoLastDigits = cpf => `${cpf[9]}${cpf[10]}`;
  const getCpfNumeral = cpf => cpf.substr(0, 9).split("");

  const isRepeatingChars = str => str.split("").every(elem => elem === str[0]);

  const toSumOfProducts = multiplier => (result, num) =>
    result + num * multiplier--;

  const getSumOfProducts = (list, multiplier) =>
    list.reduce(toSumOfProducts(multiplier), 0);

  const getValidationDigit = multiplier => cpf =>
    getDigit(mod11(getSumOfProducts(cpf, multiplier)));

  const getDigit = num => (num > 1 ? 11 - num : 0);

  const isRepeatingNumbersCpf = isRepeatingChars;

  const isValidCPF = cpf => {
    const CPF = getCpfNumeral(cpf);
    const firstDigit = getValidationDigit(10)(CPF);
    const secondDigit = getValidationDigit(11)(CPF.concat(firstDigit));

    return isEqual(getTwoLastDigits(cpf))(mergeDigits(firstDigit, secondDigit));
  };
  return NOT(isRepeatingNumbersCpf(str)) && isValidCPF(str);
};

export const checkCNPJ = str => {
  str = str.replace(/[^\d]+/g, "");

  if (str === "" || str.length !== 14) return false;

  if (
    str == "00000000000000" ||
    str == "11111111111111" ||
    str == "22222222222222" ||
    str == "33333333333333" ||
    str == "44444444444444" ||
    str == "55555555555555" ||
    str == "66666666666666" ||
    str == "77777777777777" ||
    str == "88888888888888" ||
    str == "99999999999999"
  )
    return false;

  let size = str.length - 2;
  let numbers = str.substring(0, size);
  let digits = str.substring(size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(0)) return false;
  size = size + 1;
  numbers = str.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(1)) return false;
  return true;
};
