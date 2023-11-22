import { useState } from "react";
import { isValidPermission } from "../../helpers/validationUtils";

const Modal = ({ permisos, setPermisos, setMostrarModal }) => {
  const [nuevoPermiso, setNuevoPermiso] = useState("");
  const [permisoNoValido, setPermisoNoValido] = useState(false);

  const handleOkButtonClick = () => {
    if (!isValidPermission(nuevoPermiso)) {
      //closeModal();
      setPermisoNoValido(true);
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

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && nuevoPermiso.trim() !== "") {
      handleOkButtonClick();
    }

    if (e.key === "Escape" && nuevoPermiso.trim() !== "") {
      closeModal();
    }
  };

  const closeModal = () => {
    setMostrarModal(false);
  };

  return (
    <div className="modal" id="myModal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>Agregue un nuevo Permiso:</h2>
        </div>
        {permisoNoValido ? (
          <div className="herror">
            <h3>Formato del permiso incorrecto - Ejemplo: ENTIDAD:PERMISO</h3>
          </div>
        ) : null}
        <div className="modal-body">
          <input
            type="text"
            className="input-modal"
            placeholder="ej: PROJECT:WRITE"
            value={nuevoPermiso}
            onChange={(e) => setNuevoPermiso(e.target.value)}
            onKeyDown={handleEnterPress}
          />
        </div>
        <div className="modal-footer">
          <button className="boton-ok-modal" onClick={handleOkButtonClick}>
            OK
          </button>
          <button className="boton-cancel-modal" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
