// NotificationComponent.js
import React from 'react';
import './NotificationComponent.css';

const NotificationComponent = ({ message, entity_type, action, show }) => {
  return (
    <div className={`notification-component ${show ? 'visible' : 'hidden'}`}>
      <p style={{ fontSize: 'larger', marginBottom: '5px', paddingRight: '15px' }}>{message}</p>
      {action && (
        <p style={{ marginBottom: '2px' }}>TIPO: {action}</p>
      )}
      {entity_type && (
        <p>ENTIDADE: {entity_type}</p>
      )}
    </div>
  );
};

export default NotificationComponent;
