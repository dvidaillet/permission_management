//funcion para eliminar duplicados
export function removeDuplicates(array) {
  const uniqueArray = [...new Set(array)];
  return uniqueArray;
}

//Funcion para obtener un arreglo solo con los nombres de los permisos
/* export const getPermissionValues = (permissions) => {
  return permissions.map((permission) => permission.filter((p) =>
  p.includes("READ")
))};
 */


/* export const getPermissionValues = (permissions) => {
  return permissions.map((permission) => permission.split(":")[1]);
}; */
