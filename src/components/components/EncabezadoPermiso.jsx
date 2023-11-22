import { useState } from "react";
import { capitalizarPermiso } from "../../helpers/capitalizarUtils";
import papeleraIcon from "../../papelera.png";

const EncabezadoPermizo = ({
  p,
  roles,
  entidad,
  permisos,
  setPermisos,
  setRoles,
}) => {
  const [mostrarIconosPermiso, setMostrarIconosPermiso] = useState(false);
  const [permisoCheked, setPermisoCheked] = useState(false);

  const handleMouseEnterPermiso = () => {
    setMostrarIconosPermiso(true);
  };
  const handleMouseLeavePermiso = () => {
    setMostrarIconosPermiso(false);
  };

  const handleCheckboxChangePermiso = (permiso, entidad) => {
    const nombreFull = `${entidad}:${permiso}`;

    if (permisoCheked) {
      const updateRoles = roles.map((rol) => {
        const updatePermissions = rol.permissions.filter(
          (permiso) => permiso !== nombreFull
        );
        return { ...rol, permissions: updatePermissions };
      });
      setRoles(updateRoles);
    } else {
      const updateRoles = roles.map((rol) => {
        // Verificar si el permiso ya existe en el arreglo de permissions
        if (!rol.permissions.includes(nombreFull)) {
          const nuevosPermisos = [...rol.permissions, nombreFull];
          return { ...rol, permissions: nuevosPermisos };
        } else {
          // Si el permiso ya existe, devolver el rol sin cambios
          return rol;
        }
      });
      setRoles(updateRoles);
    }

    setPermisoCheked(!permisoCheked);
  };

  const borrarPermiso = (permiso, entidad) => {
    const nombreFull = `${entidad}:${permiso}`;
    const updatedPermissions = permisos.filter(
      (permiso) => permiso !== nombreFull
    );
    setPermisos(updatedPermissions);
  };

  const permisoCapitalizado = capitalizarPermiso(p);
  return (
    <th
    className="encabezado-Permiso"
      onMouseEnter={() => handleMouseEnterPermiso()}
      onMouseLeave={() => handleMouseLeavePermiso()}
    >
      {mostrarIconosPermiso ? (
        <div className="celdas">
          <div>
            <input
              type="checkbox"
              name="ceckbocxPermiso"
              defaultChecked={permisoCheked}
              onChange={() => handleCheckboxChangePermiso(p, entidad)}
            />
            {permisoCapitalizado}
          </div>
          <div>
            <img
              className="icono-papelera"
              src={papeleraIcon}
              alt="Eliminar"
              onClick={() => borrarPermiso(p, entidad)}
            />
          </div>
        </div>
      ) : (
        permisoCapitalizado
      )}
    </th>
  );
};

export default EncabezadoPermizo;
