import React, { useState } from "react";

import { removeDuplicates } from "../helpers/utils";

const RolesComponent = ({ initialRoles, initialPermissions }) => {
  //estados iniciales del compoenente
  const [roles, setRoles] = useState(initialRoles);
  const [permisos, setPermisos] = useState(initialPermissions);
  const [permisosMap, setPermisosMap] = useState([]);

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
        <th key={i} colSpan={permisosCount}>
          {entidad}
        </th>
      );
    });
  };

  //funcion para mostrar los permisos en los encabezados por entidad
  const renderEntitiesPermissions = () => {
    const entidades = removeDuplicates(permisos?.map((el) => el.split(":")[0]));
    return entidades.map((entidad) => {
      const permisos = getEntityPermissions(entidad);
      return permisos.map((p, i) => <th key={i}>{p}</th>);
    });
  };

  return (
    <div>
      <table border="1">
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
              <td>{role.name}</td>
              {/* Iterar sobre los permisos para crear las celdas*/}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesComponent;
