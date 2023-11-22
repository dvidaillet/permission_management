//funcion para eliminar duplicados
export function removeDuplicates(array) {
  const uniqueArray = [...new Set(array)];
  return uniqueArray;
}
