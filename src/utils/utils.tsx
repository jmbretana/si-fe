export const formatMoney = (num: number) => {
  try {
    const vNum = Number(num.toFixed(2));
    const format = Intl.NumberFormat("de-DE").format(vNum);
    return `${format}`;
  } catch (e: any) {
    console.error(e);
    return "0";
  }
};

export const formatMoneyWithSymbol = (num: number) => {
  try {
    let vNum = num < 0 ? num * -1 : num;
    vNum = Number(vNum.toFixed(2));
    const format = Intl.NumberFormat("de-DE").format(vNum);

    let value;

    if (num < 0) {
      value = `- $ ${format}`;
    } else {
      value = `$ ${format}`;
    }

    return value;
  } catch (e: any) {
    console.error(e);
    return "0";
  }
};

export const formatTimestamp = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  } catch (e: any) {
    console.error(e);
    return "";
  }
};

export const getFechaActual = (): string => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(now.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  } catch (e: any) {
    console.error(e);
    return "";
  }
};

export const formatPhoneNumber = (phoneNumber?: string) => {
  // Eliminar cualquier carácter no numérico
  if (!phoneNumber) {
    return "";
  }

  const cleaned = ("" + phoneNumber).replace(/\D/g, "");

  // Verificar si el número tiene al menos 4 dígitos
  if (cleaned.length < 4) {
    return phoneNumber;
  }

  const last = cleaned.slice(-4);
  const front = cleaned.slice(0, -4);

  let frontLast = "";
  let frontFirst = "";

  if (front.length > 4) {
    frontLast = front.slice(-4);
    frontFirst = "(" + front.slice(0, -4) + ") ";
  } else {
    frontFirst = "(11) ";
    frontLast = front;
  }

  return frontFirst + frontLast + "-" + last;
};

export const capitalizeFirstLetter = (string?: string) => {
  if (string) {
    const value = string?.toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
  } else return "";
};

export const capitalizeEachWord = (phrase?: string) => {
  if (!phrase) return "";

  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const transformDateToISO = (date: string): string => {
  try {
    // Dividir la fecha en día, mes y año
    const [day, month, year] = date.split("/");

    // Retornar la fecha en formato ISO (yyyy-mm-dd)
    return `${year}-${month}-${day}`;
  } catch (e: any) {
    console.error("Error al transformar la fecha:", e);
    return "";
  }
};

export const formatDateToDDMMYYYY = (isoDate: string): string => {
  try {
    const date = new Date(isoDate);

    // Extraer día, mes y año
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Los meses son base 0
    const year = date.getUTCFullYear();

    // Retornar la fecha en formato dd/mm/yyyy
    return `${day}/${month}/${year}`;
  } catch (e: any) {
    console.error("Error al formatear la fecha:", e);
    return "";
  }
};

export const roundBalance = (num?: number) => {
  let number = num || 0;
  if (number < 1 && number > -1) number = 0;
  return number;
};
