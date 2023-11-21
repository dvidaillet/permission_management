import { useState } from "react";
import { isValidPermission } from "../../helpers/validationUtils";

const Modal = ({ permisos, setPermisos, setMostrarModal }) => {
  const [nuevoPermiso, setNuevoPermiso] = useState("");

  const enviar = () => {
    console.log(permisos);
  };

  const handleOkButtonClick = () => {
    if (!isValidPermission(nuevoPermiso)) {
      closeModal();
      setNuevoPermiso("");
      alert("Formato del permiso incorrecto - ej:EENTIDAD:PERMISO");
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
  };
  const closeModal = () => {
    setMostrarModal(false);
  };

  return (
    <form onSubmit={enviar} className="modal">
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
          onKeyDown={handleEnterPress}
        />
        <button onClick={handleOkButtonClick}>OK</button>
      </div>
    </form>
  );
};

export default Modal;
