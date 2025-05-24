// @ts-nocheck
import "./index.css";
import { X } from "lucide-react";

const Popup = ({ isOpen, onClose, onSuccess, onCancel, title, children, className = "", overlayClassName = "", contentClassName = "" }) => {
  if (!isOpen) return null;

  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <div className={`popup-overlay ${overlayClassName}`}>
      {/* Overlay */}
      <div className="popup-backdrop" onClick={onClose} />

      {/* Popup Content */}
      <div className={`popup-container ${className}`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="popup-header">
          <h2 className="popup-title">{title}</h2>
          <button onClick={onClose} className="popup-close-button">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className={`popup-content ${contentClassName}`}>{children}</div>

        {/* Footer */}
        <div className="popup-footer">
          <button onClick={handleCancel} className="popup-button popup-button-cancel">
            Cancel
          </button>
          <button onClick={handleSuccess} className="popup-button popup-button-success">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
