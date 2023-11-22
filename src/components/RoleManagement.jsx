/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { removeDuplicates } from "../helpers/utils";
import { isValidRoleName } from "../helpers/validationUtils";

import "./RoleManagement.css";
import EncabezadoEntidad from "./components/EncabezadoEntidad";
import EncabezadoPermizo from "./components/EncabezadoPermiso";
import Modal from "./components/Modal";
import CeldasRoles from "./components/CeldasRoles";
import axiosRequest from "./AxiosRole";

const RolesComponent = ({ initialRoles, initialPermissions }) => {
  //estados iniciales del compoenente
  const [roles, setRoles] = useState(initialRoles);
  const [permisos, setPermisos] = useState(initialPermissions);
  const [permisosMap, setPermisosMap] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreNuevoRole, setNombreNuevoRole] = useState("");
  const [rolIncorrecto, setRolIncorrecto] = useState(false);

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

  //funcion para mostrar los permisos en los encabezados por entidad
  const renderEntitiesPermissions = () => {
    const entidades = removeDuplicates(permisos?.map((el) => el.split(":")[0]));
    return entidades.map((entidad) => {
      const entidadPermisos = getEntityPermissions(entidad);
      return entidadPermisos.map((p, i) => {
        return (
          <EncabezadoPermizo
            key={i}
            p={p}
            roles={roles}
            entidad={entidad}
            permisos={permisos}
            setRoles={setRoles}
            setPermisos={setPermisos}
          />
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

  //implementa lagica para agregar un nuevo rol
  const handleEnterPress = (e) => {
    if (e.key === "Enter" && nombreNuevoRole.trim() !== "") {
      addNewRole();
    }
  };

  const addNewRole = async() => {
    const existe = roles.some(
      (rol) => rol.name.toLowerCase() === nombreNuevoRole.toLowerCase()
    );

    if (existe || !isValidRoleName(nombreNuevoRole)) {
      setRolIncorrecto(true);
      setTimeout(() => {
        setRolIncorrecto(false);
        setNombreNuevoRole("");
      }, 3000);
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
    try {
      await axiosRequest.post('',newRole)
    } catch (error) {
      console.log(error.message)
    }
    
  };

  const handleSaveClick = () => {
    console.log(roles);
  };

  return (
    <div className="container">
      <div className="tabla-container">
        <table className="center">
          <thead>
            <tr>
              <th className="primera-columna " rowSpan="2">
                Roles
              </th>
              {renderEntities()}
            </tr>
            <tr>{renderEntitiesPermissions()}</tr>
          </thead>

          <tbody>
            {roles.length === 0 ? (
              <tr>
                <td colSpan={permisos.length + 1}>
                  <h4 className="addRolInput">
                    No existen roles guardados en base de datos{" "}
                  </h4>
                </td>
              </tr>
            ) : null}
            {/* Iterando sobre los roles para crear las filas */}
            {roles.map((rol) => (
              <CeldasRoles
                key={rol.id}
                rol={rol}
                roles={roles}
                permisos={permisos}
                setRoles={setRoles}
                setMostrarModal={setMostrarModal}
                permisosMap={permisosMap}
              />
            ))}
            {/* adicionando fila para agregar nuevo Rol */}
            <tr>
              <td colSpan={permisos.length + 1}>
                <input
                  className="addRolInput"
                  type="text"
                  name="nuevoRolInput"
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

      <div className="buton-container">
        <button className="boton-salvar" onClick={handleSaveClick}>
          Save
        </button>
        {rolIncorrecto ? (
          <h4 rowSpan={permisos.length - 1}>
            El nombre del rol ya existe o tiene un formato incorrecto
          </h4>
        ) : null}
      </div>

      {/* Modal */}
      {mostrarModal && (
        <Modal
          permisos={permisos}
          setPermisos={setPermisos}
          setMostrarModal={setMostrarModal}
        />
      )}
    </div>
  );
};

export default RolesComponent;
