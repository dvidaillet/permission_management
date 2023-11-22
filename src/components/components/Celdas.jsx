const Celdas = ({ exist, isUltimaColumna, setMostrarModal }) => {
  //eventos del modal
  const openModal = () => {
    if (isUltimaColumna) {
      setMostrarModal(true);
    }
  };
  return (
    
    <td
      className={isUltimaColumna ? "ultima celda" : "celda"}
      onClick={openModal}
    >
      {exist ? "X" : ""}
    </td>
  );
};

export default Celdas;
