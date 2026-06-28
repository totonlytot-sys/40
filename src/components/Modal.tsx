import React from 'react';

interface Props {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 200, padding: 20
    }} onClick={onClose}>
      <div style={{
        background: '#1a1d24', border: '1px solid #2a2e38', borderRadius: 16, padding: 24,
        maxWidth: 480, width: '100%', maxHeight: '80vh', overflowY: 'auto'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: 16 }}>{title}</div>
        {children}
      </div>
    </div>
  );
};
