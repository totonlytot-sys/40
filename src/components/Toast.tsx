import React from 'react';
import { useApp } from '../AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
      background: '#2a3a5a', color: '#fff', padding: '10px 20px', borderRadius: 8,
      fontSize: '.875rem', zIndex: 100, animation: 'fadeIn .3s'
    }}>
      {toast}
    </div>
  );
};
