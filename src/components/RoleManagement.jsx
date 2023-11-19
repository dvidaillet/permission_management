import React, { useCallback, useEffect, useState } from "react";

import { removeDuplicates } from "../helpers/utils";
import { isValidPermission } from "../helpers/validationUtils";
import {
  capitalizarEntidad,
  capitalizarPermiso,
} from "../helpers/capitalizarUtils";

import "./RoleManagement.css";

const RolesComponent = ({ initialRoles, initialPermissions }) => {
  //estados iniciales del compoenente
  const [roles, setRoles] = useState(initialRoles);
  const [permisos, setPermisos] = useState(initialPermissions);
  const [permisosMap, setPermisosMap] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoPermiso, setNuevoPermiso] = useState("");
  const [nombreNuevoRole, setNombreNuevoRole] = useState("");

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
        //establesco ancho de la columna
        <th
          key={i}
          colSpan={permisosCount}
          onMouseOver={() => borrarEntidad(entidad)}
        >
          {capitalizarEntidad(entidad)}
        </th>
      );
    });
  };

  const borrarEntidad = (entidad) => {
    console.log("🚀 - borrarEntidad - entidad:", entidad);
  };

  //funcion para mostrar los permisos en los encabezados por entidad
  const renderEntitiesPermissions = () => {
    const entidades = removeDuplicates(permisos?.map((el) => el.split(":")[0]));
    return entidades.map((entidad) => {
      const permisos = getEntityPermissions(entidad);
      return permisos.map((p, i) => {
        const permisoCapitalizado = capitalizarPermiso(p);
        return (
          <th key={i} onMouseOver={() => borrarPermiso(p, entidad)}>
            {permisoCapitalizado}
          </th>
        );
      });
    });
  };

  const borrarPermiso = (permiso, entidad) => {
    console.log("🚀 - borrarPermiso - entidad:", entidad);
    console.log("🚀 - borrarPermiso - permiso:", permiso);
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
  const openModal = () => {
    setMostrarModal(true);
  };

  const closeModal = () => {
    setMostrarModal(false);
  };

  // Implementa la lógica para agregar un nuevo permiso con el nombre ingresado
  const handleOkButtonClick = () => {
    //TODO:Validar que si la entidad existe no cree una nueva
    //y coloque el permiso en la entidad correpondiente
    if (!isValidPermission(nuevoPermiso)) {
      setNuevoPermiso("");
      return;
    }
    setPermisos([...permisos, nuevoPermiso]);
    closeModal();
  };
  //------------------------------------------

  //implementa lagica para agregar un nuevo permiso
  const handleEnterPress = (e) => {
    if (e.key === "Enter" && nombreNuevoRole.trim() !== "") {
      addNewRole();
    }
  };

  const addNewRole = (e) => {
    const existe = roles.some((rol) => rol.name === nombreNuevoRole);
    if (existe) {
      setNombreNuevoRole("");
      return;
    }

    //TODO:Validar bien que READ este en el lado de los permisos
    const readPermissions = permisos.filter((p) => p.includes("READ"));

    const newRole = {
      id: "2", //TODO:Asignar nuevo ID compatible con mongodb
      name: nombreNuevoRole,
      permissions: readPermissions,
    };

    setRoles([...roles, newRole]);
    setNombreNuevoRole("");
  };

  const borrarRol = (rol) => {
    console.log("🚀 - borrarRol - rol:", rol);
  };

  return (
    <div>
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
              <td onMouseOver={()=>borrarRol(role)}>
                {capitalizarEntidad(role.name)}
              </td>
              {/* Iterar sobre los permisos para crear las celdas*/}
              {permisosMap.map((p, i) => {
                const exist = role?.permissions?.includes(p);
                return <td key={i}>{exist ? "X" : ""}</td>;
              })}
              <td>
                <button onClick={openModal}>+</button>
              </td>
            </tr>
          ))}

          {/* adicionando fila para agregar nuevo Rol */}
          <tr>
            <td colSpan={permisos.length + 1}>
              <input
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
