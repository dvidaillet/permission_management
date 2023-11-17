import React, { useState } from "react";

import { removeDuplicates } from "../helpers/utils";
import { capitalizarEntida } from "../helpers/capitalizarUtils";

const RolesComponent = ({ initialRoles, initialPermissions }) => {
  //estados iniciales del compoenente
  const [roles, setRoles] = useState(initialRoles);
  const [permisos, setPermisos] = useState(initialPermissions);

  //Funcion para crear un arreglo con los nombres de las entidades
  const getEntities = () =>
    removeDuplicates(permisos?.map((el) => el.split(":")[0]));

  // funcion para contar la cantidad de elementos del arreglo de permisos
  const getEntityPermissionCount = (entity) =>
    permisos.filter((el) => el?.startsWith(`${entity}:`)).length;

  //funcion para renderizar un ecabezado con los nombres de las entidades
  const renderEntities = () => {
    const entidades = getEntities();
    return entidades.map((entidad, i) => {
      const permisosCount = getEntityPermissionCount(entidad);      
      return (
        <th key={i} colSpan={permisosCount}>
          {entidad}
        </th>
      );
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
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default RolesComponent;
