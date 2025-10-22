export function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, '');
}

export const transformToDecimal = (value: number | undefined) => {
  if (value !== undefined) {
    if (value === 0) return '0';
    if (value && value < 10) return '0.' + value + '0';
    if (value && value === 10) return '1';
  } else return '';
};

export const transformToDecimalNumber = (value: number) => {
  let decimal = '';

  if (value < 10) {
    decimal = '0.' + value + '0';
  } else {
    decimal = '1';
  }

  return Number(decimal);
};

export const invertDecimal = (value: number) => {
  let v = 1;

  switch (value) {
    case 0:
      v = 0;
      break;
    case 0.1:
      v = 1;
      break;
    case 0.2:
      v = 2;
      break;
    case 0.3:
      v = 3;
      break;
    case 0.4:
      v = 4;
      break;
    case 0.5:
      v = 5;
      break;
    case 0.6:
      v = 6;
      break;
    case 0.7:
      v = 7;
      break;
    case 0.8:
      v = 8;
      break;
    case 0.9:
      v = 9;
      break;
    case 1:
      v = 10;
      break;
  }

  return v;
};

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
