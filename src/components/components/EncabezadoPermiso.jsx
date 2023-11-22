import { useState } from "react";
import { capitalizarPermiso } from "../../helpers/capitalizarUtils";
import papeleraIcon from "../../papelera.png";

const EncabezadoPermiso = ({
  p,
  roles,
  entidad,
  permisos,
  setPermisos,
  setRoles,
}) => {
  const [mostrarIconosPermiso, setMostrarIconosPermiso] = useState(false);
  const [permisoCheked, setPermisoCheked] = useState(false);

  const handleMouseEnterPermiso = () => setMostrarIconosPermiso(true);
  const handleMouseLeavePermiso = () => setMostrarIconosPermiso(false);

  const handleCheckboxChangePermiso = () => {
    const nombreFull = `${entidad}:${p}`;
    const updateRoles = roles.map((rol) => {
      const updatePermissions = permisoCheked
        ? rol.permissions.filter((permiso) => permiso !== nombreFull)
        : [...rol.permissions, nombreFull];
      return { ...rol, permissions: updatePermissions };
    });
    setRoles(updateRoles);
    setPermisoCheked(!permisoCheked);
  };

  const borrarPermiso = () => {
    const nombreFull = `${entidad}:${p}`;
    const updatedPermissions = permisos.filter((permiso) => permiso !== nombreFull);
    setPermisos(updatedPermissions);
  };

  const permisoCapitalizado = capitalizarPermiso(p);

  return (
    <th
      className="encabezado-Permiso"
      onMouseEnter={handleMouseEnterPermiso}
      onMouseLeave={handleMouseLeavePermiso}
    >
      {mostrarIconosPermiso ? (
        <div className="celdas">
          <div>
            <input
              type="checkbox"
              name="ceckbocxPermiso"
              defaultChecked={permisoCheked}
              onChange={handleCheckboxChangePermiso}
            />
            {permisoCapitalizado}
          </div>
          <div>
            <img
              className="icono-papelera"
              src={papeleraIcon}
              alt="Eliminar"
              onClick={borrarPermiso}
            />
          </div>
        </div>
      ) : (
        permisoCapitalizado
      )}
    </th>
  );
};

export default EncabezadoPermiso;
