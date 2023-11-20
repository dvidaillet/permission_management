/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { removeDuplicates } from "../helpers/utils";

import { capitalizarEntidad } from "../helpers/capitalizarUtils";

import "./RoleManagement.css";
import papeleraIcon from "../papelera.png";
import Celdas from "./components/Celdas";
import EncabezadoEntidad from "./components/EncabezadoEntidad";
import EncabezadoPermizo from "./components/EncabezadoPermiso";
import Modal from "./components/Modal";

const RolesComponent = ({ initialRoles, initialPermissions }) => {
  //estados iniciales del compoenente
  const [roles, setRoles] = useState(initialRoles);
  const [permisos, setPermisos] = useState(initialPermissions);
  const [permisosMap, setPermisosMap] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreNuevoRole, setNombreNuevoRole] = useState("");
  //states para mostrar los iconos de las celdas
  const [mostrarIconosRol, setMostrarIconosRol] = useState(false);
  //states para verificar los check
  const [rolCheked, setRolCheked] = useState(false);

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
      const permisos = getEntityPermissions(entidad);
      return permisos.map((p, i) => {
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

  //funciones para manejar los eventos del mouse
  const handleMouseEnterRol = () => {
    setMostrarIconosRol(true);
  };
  const handleMouseLeaveRol = () => {
    setMostrarIconosRol(false);
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
