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

  //funciones para manejar los eventos del mouse
  const handleMouseEnter = () => {
    setMostrarIconosEntidad(true);
  };
  const handleMouseLeave = () => {
    setMostrarIconosEntidad(false);
  };

  const handleCheckboxChangeEntidad = (entidad) => {
    let updatedRoles = [];
    if (entidadCheked) {
      updatedRoles = (roles) => {
        const filteredRoles = [...roles].map((rol) => {
          const filteredPermissions = rol.permissions.filter(
            (permission) => !permission.startsWith(entidad)
          );

          return { ...rol, permissions: filteredPermissions };
        });

        return filteredRoles;
      };
    } else {
      const entityPermissions = permisos.filter((p) => p.startsWith(entidad));

      updatedRoles = (roles) => {
        const filteredRoles = [...roles].map((rol) => {
          const filteredPermissions = rol.permissions.filter(
            (permission) => !permission.startsWith(entidad)
          );

          return {
            ...rol,
            permissions: [...filteredPermissions, ...entityPermissions],
          };
        });

        return filteredRoles;
      };
    }

    setRoles(updatedRoles);
    setEntidadCheked(!entidadCheked);
  };

  const borrarEntidad = (entidad) => {
    const updatedPermissions = permisos.filter(
      (permiso) => !permiso.includes(entidad)
    );
    setPermisos(updatedPermissions);
  };

  return (
    <th
      colSpan={permisosCount}
      className="encabezado-entidad"
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      {mostrarIconosEntidad ? (
        <div className="celdas">
          <div>
            <input
              type="checkbox"
              name="ceckbocxEntidad"
              defaultChecked={entidadCheked}
              onChange={() => handleCheckboxChangeEntidad(entidad)}
            />
            {capitalizarEntidad(entidad)}
          </div>
          <div>
            <img
              className="icono-papelera"
              src={papeleraIcon}
              alt="Eliminar"
              onClick={() => borrarEntidad(entidad)}
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
