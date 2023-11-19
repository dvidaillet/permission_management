export const procesarEntidad = (entidad) => {
    return entidad.charAt(0).toUpperCase() + (entidad.split(":")[0] || '').slice(1).toLowerCase()
    
  };

  export const procesarPermisos = (permisos) => {
    return permisos.map(permiso =>
      (permiso.split(":")[1] || '').replace(/_/g, ' ')
        .split(' ')
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
        .join(' ')
    );
  };