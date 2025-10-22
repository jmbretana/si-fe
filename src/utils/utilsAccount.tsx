export const convertDateToTimestamp = (dateString: string): number => {
  try {
    const [day, month, year] = dateString.split("/").map(Number); // Dividir la fecha y convertir a números
    const date = new Date(year, month - 1, day); // Crear un objeto Date (meses son base 0)
    return date.getTime(); // Obtener el timestamp
  } catch (e: any) {
    console.error("Error al convertir la fecha:", e);
    return 0; // Retornar 0 en caso de error
  }
};
