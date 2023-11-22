//Funcion para validar que el nuevo permiso cumpla con la sintaxis espesifica
export const isValidPermission = (permission) => {
    const regex = /^[A-Z_]+:[A-Z_]+$/;
    return regex.test(permission);
  };

  export const isValidRoleName = (rolName) => {
    const regex = /^[a-z]+$/;
    return regex.test(rolName);
  };