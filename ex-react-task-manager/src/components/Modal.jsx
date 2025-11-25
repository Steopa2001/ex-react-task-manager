import React from "react";
import ReactDOM from "react-dom";

const Modal = ({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "Conferma"
}) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div className="modal-content p-4 bg-white rounded" style={{ minWidth: 300 }}>
        <h3>{title}</h3>
        <div className="mb-3">{content}</div>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>Annulla</button>
          <button className="btn btn-danger" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
