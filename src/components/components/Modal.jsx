import { useState } from "react";
import { isValidPermission } from "../../helpers/validationUtils";

const Modal = ({ permisos, setPermisos, setMostrarModal }) => {
  const [nuevoPermiso, setNuevoPermiso] = useState("");

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

  const closeModal = () => {
    setMostrarModal(false);
  };

  return (
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
  );
};

export default Modal;
