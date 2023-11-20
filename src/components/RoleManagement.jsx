/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { removeDuplicates } from "../helpers/utils";
import { isValidPermission } from "../helpers/validationUtils";
import {
  capitalizarEntidad,
  capitalizarPermiso,
} from "../helpers/capitalizarUtils";

import "./RoleManagement.css";
import papeleraIcon from "../papelera.png";
import Celdas from "./components/Celdas";
import EncabezadoEntidad from "./components/EncabezadoEntidad";

const RolesComponent = ({ initialRoles, initialPermissions }) => {
  //estados iniciales del compoenente
  const [roles, setRoles] = useState(initialRoles);
  const [permisos, setPermisos] = useState(initialPermissions);
  const [permisosMap, setPermisosMap] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoPermiso, setNuevoPermiso] = useState("");
  const [nombreNuevoRole, setNombreNuevoRole] = useState("");
  //states para mostrar los iconos de las celdas
  const [mostrarIconosRol, setMostrarIconosRol] = useState(false);
  const [mostrarIconosPermiso, setMostrarIconosPermiso] = useState(false);
  //states para verificar los check
  const [rolCheked, setRolCheked] = useState(false);
  const [permisoCheked, setPermisoCheked] = useState(false);
  
  //Funcion para crear un arreglo con los nombres de las entidades
  const getEntities = () =>
    removeDuplicates(permisos?.map((el) => el.split(":")[0]));

  // funcion para contar la cantidad de permisos de una entidad especificada
  const getEntityPermissionCount = (entity) =>
    permisos.filter((el) => el?.startsWith(`${entity}:`)).length;

  //funcion para obtener los permisos por entidad
  const getEntityPermissions = (entidad) =>
    permisos
      .filter((el) => el.startsWith(`${entidad}:`))
      .map((el) => el.split(":")[1]);

  //funcion para renderizar un ecabezado con los nombres de las entidades
  const renderEntities = () => {
    const entidades = getEntities();

    return entidades.map((entidad, i) => {
      //obtengo cantidad de permisos para cada entidad para establecer ancho de la columna
      const permisosCount = getEntityPermissionCount(entidad);
      return (
        <EncabezadoEntidad
          key={i}
          entidad={entidad}
          permisosCount={permisosCount}
          roles={roles}
          permisos={permisos}
          setRoles={setRoles}
          setPermisos={setPermisos}
        />
      );
    });
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
      (permiso) => !permiso.includes(nombreFull)
    );
    setPermisos(updatedPermissions);
  };

  //funcion para mostrar los permisos en los encabezados por entidad
  const renderEntitiesPermissions = () => {
    const entidades = removeDuplicates(permisos?.map((el) => el.split(":")[0]));
    return entidades.map((entidad) => {
      const permisos = getEntityPermissions(entidad);
      return permisos.map((p, i) => {
        const permisoCapitalizado = capitalizarPermiso(p);
        return (
          <th
            key={i}
            onMouseEnter={() => handleMouseEnterPermiso()}
            onMouseLeave={() => handleMouseLeavePermiso()}
          >
            {mostrarIconosPermiso ? (
              <div className="celdas">
                <div>
                  <input
                    type="checkbox"
                    name="ceckbocxPermiso"
                    onChange={() => handleCheckboxChangePermiso(p, entidad)}
                  />
                  {permisoCapitalizado}
                </div>
                <div>
                  <img
                    className="icono-papelera"
                    src={papeleraIcon}
                    onClick={() => borrarPermiso(p, entidad)}
                  />
                </div>
              </div>
            ) : (
              permisoCapitalizado
            )}
          </th>
        );
      });
    });
  };

  const getPermissionsMap = useCallback(() => {
    const pMap = [];
    const entities = getEntities();
    entities.forEach((entity) => {
      const permissions = getEntityPermissions(entity);
      permissions.forEach((p) => {
        pMap.push(`${entity}:${p}`);
      });
    });
    return pMap;
  }, [roles, permisos]);

  useEffect(() => {
    if (roles.length > 0) {
      const pMap = getPermissionsMap();
      setPermisosMap(pMap);
    }
  }, [roles, getPermissionsMap, permisos]);

  //codigo para agregar nuevo permiso
  // Implementa la lógica para agregar un nuevo permiso con el nombre ingresado
  const handleOkButtonClick = () => {
    if (!isValidPermission(nuevoPermiso)) {
      setNuevoPermiso("");
      return;
    }
    const existe = permisos.includes(nuevoPermiso);
    if (existe) {
      alert("Este permiso ya existe");
      setNuevoPermiso("");
      return;
    }
    setPermisos([...permisos, nuevoPermiso]);
    setNuevoPermiso("");
    closeModal();
  };
  //------------------------------------------

  //implementa lagica para agregar un nuevo rol
  const handleEnterPress = (e) => {
    if (e.key === "Enter" && nombreNuevoRole.trim() !== "") {
      addNewRole();
    }
  };

  const addNewRole = (e) => {
    const existe = roles.some(
      (rol) => rol.name.toLowerCase() === nombreNuevoRole.toLowerCase()
    );
    if (existe) {
      alert("Ya existe un rol con este nombre");
      setNombreNuevoRole("");
      return;
    }

    const readPermissions = [...permisos].filter((p) => p.includes("READ"));
    const newRole = {
      id: uuidv4(),
      name: nombreNuevoRole,
      permissions: readPermissions,
    };

    setRoles([...roles, newRole]);
    setNombreNuevoRole("");
  };

  const handleCheckboxChangeRol = (rol) => {
    const updatedRol = {
      ...rol,
      permissions: rolCheked ? [] : permisos,
    };

    const updatedRoles = roles.map((r) =>
      r.name === rol.name ? updatedRol : r
    );

    setRolCheked(!rolCheked);
    setRoles(updatedRoles);
  };

  //funcion para eliminar un rol
  const borrarRol = (rol) => {
    const newRoles = [...roles].filter((r) => r !== rol);
    setRoles(newRoles);
  };

  //eventos del modal
  const openModal = () => {
    setMostrarModal(true);
  };

  const closeModal = () => {
    setMostrarModal(false);
  };

  //funciones para manejar los eventos del mouse
  const handleMouseEnterRol = () => {
    setMostrarIconosRol(true);
  };
  const handleMouseLeaveRol = () => {
    setMostrarIconosRol(false);
  };

  const handleMouseEnterPermiso = () => {
    setMostrarIconosPermiso(true);
  };
  const handleMouseLeavePermiso = () => {
    setMostrarIconosPermiso(false);
  };

  return (
    <div className="container">
      <div className="tabla-container">
        <table className="center">
          <thead>
            <tr>
              <th rowSpan="2">Roles</th>
              {renderEntities()}
            </tr>
            <tr>{renderEntitiesPermissions()}</tr>
          </thead>
          <tbody>
            {/* Iterando sobre los roles para crear las filas */}
            {roles.map((role) => (
              <tr key={role.id}>
                <td
                  onMouseEnter={() => handleMouseEnterRol()}
                  onMouseLeave={() => handleMouseLeaveRol()}
                >
                  {mostrarIconosRol ? (
                    <div className="celdas">
                      <div>
                        <input
                          type="checkbox"
                          name="ceckbocxRol"
                          onChange={() => handleCheckboxChangeRol(role)}
                        />
                        {capitalizarEntidad(role.name)}
                      </div>

                      <div>
                        <img
                          className="icono-papelera"
                          src={papeleraIcon}
                          onClick={() => borrarRol(role)}
                        />
                      </div>
                    </div>
                  ) : (
                    capitalizarEntidad(role.name)
                  )}
                </td>
                {/* Iterar sobre los permisos para crear las celdas*/}
                {permisosMap.map((p, i) => {
                  const exist = role?.permissions?.includes(p);
                  return <Celdas key={i} exist={exist} />;
                })}
                <td className="tdboton">
                  <button className="boton" onClick={openModal}>
                    Add Permission
                  </button>
                </td>
              </tr>
            ))}
            {/* adicionando fila para agregar nuevo Rol */}
            <tr>
              <td colSpan={permisos.length + 1}>
                <input
                  className="addRolInput"
                  type="text"
                  placeholder="Add Role"
                  value={nombreNuevoRole}
                  onChange={(e) => setNombreNuevoRole(e.target.value)}
                  onKeyDown={handleEnterPress}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {mostrarModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <label>Nuevo Permiso:</label>
            <input
              type="text"
              placeholder="ej: PROJECT:WRITE"
              value={nuevoPermiso}
              onChange={(e) => setNuevoPermiso(e.target.value)}
            />
            <button onClick={handleOkButtonClick}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesComponent;
