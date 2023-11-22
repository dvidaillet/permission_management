import { useState } from "react";
import Celdas from "./Celdas";
import { capitalizarEntidad } from "../../helpers/capitalizarUtils";
import papeleraIcon from "../../papelera.png";
import axiosRequest from "../AxiosRole";

const CeldasRoles = ({
  rol,
  roles,
  permisos,
  permisosMap,
  setRoles,
  setMostrarModal,
}) => {
  //states
  const [mostrarIconosRol, setMostrarIconosRol] = useState(false);
  const [rolCheked, setRolCheked] = useState(false);

  //funcion para eliminar un rol
  const borrarRol = async (rol) => {
    const id = rol.id;
    const newRoles = [...roles].filter((r) => r !== rol);
    setRoles(newRoles);
    try {
      await axiosRequest.delete("", id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheckboxChangeRol = async (rol) => {
    const updatedRol = {
      ...rol,
      permissions: rolCheked ? [] : permisos,
    };

    const updatedRoles = roles.map((r) =>
      r.name === rol.name ? updatedRol : r
    );

    setRolCheked(!rolCheked);
    setRoles(updatedRoles);

    try {
      await axiosRequest.put("", updatedRol);
    } catch (error) {
      console.log(error.message);
    }
  };

  //funciones para manejar los eventos del mouse
  const handleMouseEnterRol = () => {
    setMostrarIconosRol(true);
  };
  const handleMouseLeaveRol = () => {
    setMostrarIconosRol(false);
  };

  return (
    <tr key={rol.id}>
      <td
        className="celdas encabezado-roles"
        onMouseEnter={() => handleMouseEnterRol()}
        onMouseLeave={() => handleMouseLeaveRol()}
      >
        {mostrarIconosRol ? (
          <div className="celdas encabezado-roles">
            <div>
              <input
                type="checkbox"
                defaultChecked={rolCheked}
                name="ceckbocxRol"
                onChange={() => handleCheckboxChangeRol(rol)}
              />
              {capitalizarEntidad(rol.name)}
            </div>

            <div>
              <img
                className="icono-papelera"
                src={papeleraIcon}
                alt="papelera"
                onClick={() => borrarRol(rol)}
              />
            </div>
          </div>
        ) : (
          capitalizarEntidad(rol.name)
        )}
      </td>
      {/* Iterar sobre los permisos para crear las celdas*/}
      {permisosMap.map((p, i) => {
        const exist = rol?.permissions?.includes(p);
        const isUltimaColumna = i === permisosMap.length - 1;
        return (
          <Celdas
            key={i}
            exist={exist}
            isUltimaColumna={isUltimaColumna}
            setMostrarModal={setMostrarModal}
          />
        );
      })}
    </tr>
  );
};

export default CeldasRoles;
