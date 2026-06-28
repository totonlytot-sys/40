import React from 'react';
import { useApp } from '../AppContext';

export const SettingsScreen: React.FC = () => {
  const { setScreen } = useApp();
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>Настройки</h1>
      <p style={{ fontSize: '.875rem', color: '#8892a0', marginBottom: 24 }}>Уведомления, тема, данные</p>
      <div style={{ background: '#1a1d24', border: '1px solid #2a2e38', borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ fontWeight: 600, color: '#fff', marginBottom: 12 }}>Уведомления</div>
        <p style={{ fontSize: '.875rem', color: '#8892a0' }}>Включи push-уведомления для напоминаний о квестах.</p>
      </div>
      <button onClick={() => setScreen('profile')} style={{
        background: 'transparent', border: '1px solid #4f8cff', color: '#4f8cff',
        borderRadius: 12, padding: '14px 24px', fontSize: '1rem', fontWeight: 600,
        cursor: 'pointer', width: '100%', marginTop: 8
      }}>← Назад</button>
    </div>
  );
};
