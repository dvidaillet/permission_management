import { useState } from "react";
import { capitalizarEntidad } from "../../helpers/capitalizarUtils";
import papeleraIcon from "../../papelera.png";

const EncabezadoEntidad = ({
  entidad,
  permisos,
  permisosCount,
  setRoles,
  setPermisos,
}) => {
  const [mostrarIconosEntidad, setMostrarIconosEntidad] = useState(false);
  const [entidadCheked, setEntidadCheked] = useState(false);

  const handleMouseEnter = () => setMostrarIconosEntidad(true);
  const handleMouseLeave = () => setMostrarIconosEntidad(false);

  const handleCheckboxChangeEntidad = () => {
    const entityPermissions = permisos.filter((p) => p.startsWith(`${entidad}:`));

    const updatedRoles = (roles) =>
      roles.map((rol) => {
        const filteredPermissions = rol.permissions.filter(
          (permission) => !permission.startsWith(`${entidad}:`)
        );

        return {
          ...rol,
          permissions: entidadCheked
            ? filteredPermissions
            : [...filteredPermissions, ...entityPermissions],
        };
      });

    setRoles(updatedRoles);
    setEntidadCheked(!entidadCheked);
  };
 
  const borrarEntidad = () => {
    const updatedPermissions = permisos.filter(
      (permiso) => !permiso.startsWith(`${entidad}:`)
    );
    setPermisos(updatedPermissions);
  };

  return (
    <th
      colSpan={permisosCount}
      className="encabezado-entidad"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {mostrarIconosEntidad ? (
        <div className="celdas">
          <div>
            <input
              type="checkbox"
              name="ceckbocxEntidad"
              defaultChecked={entidadCheked}
              onChange={handleCheckboxChangeEntidad}
            />
            {capitalizarEntidad(entidad)}
          </div>
          <div>
            <img
              className="icono-papelera"
              src={papeleraIcon}
              alt="Eliminar"
              onClick={borrarEntidad}
            />
          </div>
        </div>
      ) : (
        capitalizarEntidad(entidad)
      )}
    </th>
  );
};

export default EncabezadoEntidad;
