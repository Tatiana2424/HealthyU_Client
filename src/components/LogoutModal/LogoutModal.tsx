import React, { useState } from 'react';
import './LogoutModal.scss'; // Шлях до вашого CSS файлу

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
  }
  
  const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onLogout }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Are you sure you want to logout?</h3>
          <div className="modal-actions">
            <button onClick={onLogout}>Yes, Logout</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LogoutModal;