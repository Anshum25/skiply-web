import React, { useEffect } from 'react';
import '../../css/Common/popup.css';

const Popup = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium', // small, medium, large, full
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
  headerActions,
  footer
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className={`popup-container ${size} ${className}`}>
        {/* Header */}
        {(title || showCloseButton || headerActions) && (
          <div className="popup-header">
            <div className="popup-title-section">
              {title && <h2 className="popup-title">{title}</h2>}
              {headerActions && <div className="popup-header-actions">{headerActions}</div>}
            </div>
            {showCloseButton && (
              <button className="popup-close-btn" onClick={onClose} aria-label="Close">
                ×
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="popup-content">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="popup-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
