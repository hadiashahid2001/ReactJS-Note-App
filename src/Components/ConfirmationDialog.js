import React, { useRef } from 'react';
import ReactToast from './ToastMessage';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  const toastRef = useRef();

  const handleConfirm = () => {
    if (toastRef.current) {
      toastRef.current.showToast("Deleted");
    }
    onConfirm(); 
  };

  if (!isOpen) return null;

  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog">
        <h5>Are you sure?</h5>
        <div className="confirmation-dialog-buttons">
          <button className="btn" onClick={handleConfirm}>Yes</button>
          <button className="btn" onClick={onClose}>No</button>
        </div>
      </div>
      <ReactToast ref={toastRef} />
    </div>
  );
};

export default ConfirmationDialog;
