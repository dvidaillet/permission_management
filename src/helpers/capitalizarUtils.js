export const capitalizarEntidad = (entidad) => {
    return entidad.charAt(0).toUpperCase() + (entidad.split(":")[0] || '').slice(1).toLowerCase()
    
  };

  export const capitalizarPermiso = (permiso) => {
    return permiso.replace(/_/g, ' ')
        .split(' ')
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
        .join(' ')
    
  };