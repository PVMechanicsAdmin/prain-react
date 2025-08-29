import React from 'react';
import '../../styles/sidebar.css';

const Footer = () => {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#fff',
      borderTop: '1px solid #e1e8ed',
      padding: '15px 0',
      zIndex: 999
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          color: '#657786',
          fontSize: '14px',
          fontFamily: '"Roboto", "Segoe Ui", sans-serif'
        }}>
          © PRAIN Network 2024. All rights reserved.
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{
            fontSize: '14px',
            color: '#657786',
            fontFamily: '"Roboto", "Segoe Ui", sans-serif'
          }}>💳 Payment Methods</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

