import { useState } from "react";
import Celdas from "./Celdas";
import { capitalizarEntidad } from "../../helpers/capitalizarUtils";
import papeleraIcon from "../../papelera.png";

const CeldasRoles = ({
  rol,
  roles,
  permisos,
  permisosMap,
  setRoles,
  setMostrarModal,
}) => {
  //states para mostrar los iconos de las celdas
  const [mostrarIconosRol, setMostrarIconosRol] = useState(false);
  //states para verificar los check
  const [rolCheked, setRolCheked] = useState(false);
  //funcion para eliminar un rol
  const borrarRol = (rol) => {
    const newRoles = [...roles].filter((r) => r !== rol);
    setRoles(newRoles);
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

  //funciones para manejar los eventos del mouse
  const handleMouseEnterRol = () => {
    setMostrarIconosRol(true);
  };
  const handleMouseLeaveRol = () => {
    setMostrarIconosRol(false);
  };

  //eventos del modal
  const openModal = () => {
    setMostrarModal(true);
  };

  return (
    <tr key={rol.id}>
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
        return <Celdas key={i} exist={exist} />;
      })}
      <td className="tdboton">
        <button className="boton" onClick={openModal}>
          Add Permission
        </button>
      </td>
    </tr>
  );
};

export default CeldasRoles;
