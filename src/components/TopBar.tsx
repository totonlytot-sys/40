import React from 'react';
import { useApp } from '../AppContext';

export const TopBar: React.FC = () => {
  const { state } = useApp();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '12px 16px', background: '#1a1d24', border: '1px solid #2a2e38', borderRadius: 12 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#7ec850' }}>{state.level}</div>
        <div style={{ fontSize: '.625rem', textTransform: 'uppercase', color: '#8892a0', marginTop: 2 }}>Уровень</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#4f8cff' }}>{state.xp}</div>
        <div style={{ fontSize: '.625rem', textTransform: 'uppercase', color: '#8892a0', marginTop: 2 }}>XP</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#f59e0b' }}>{state.stars}★</div>
        <div style={{ fontSize: '.625rem', textTransform: 'uppercase', color: '#8892a0', marginTop: 2 }}>Звёзды</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ec4899' }}>{state.streak}</div>
        <div style={{ fontSize: '.625rem', textTransform: 'uppercase', color: '#8892a0', marginTop: 2 }}>Стрик</div>
      </div>
    </div>
  );
};
