const Celdas = ({ exist, isUltimaColumna, setMostrarModal }) => {
  //eventos del modal
  const openModal = () => {
    if (isUltimaColumna) {
      setMostrarModal(true);
    }
  };

  const cellClassName = isUltimaColumna ? "ultima celda" : "celda";
  return (
    <td className={cellClassName} onClick={openModal}>
      {exist ? "X" : ""}
    </td>
  );
};

export default Celdas;
