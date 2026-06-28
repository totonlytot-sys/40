import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { PATHS, DIFFICULTY } from '../data/constants';

export const PathStartScreen: React.FC = () => {
  const { state, setScreen, startPath } = useApp();
  const [selectedDiff, setSelectedDiff] = useState<string | null>(null);

  const pathId = state.activePath?.id || 'blogger';
  const p = PATHS[pathId];

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>{p.icon} {p.name}</h1>
      <p style={{ fontSize: '.875rem', color: '#8892a0', marginBottom: 24 }}>Выбери уровень челленджа</p>

      <div style={{
        background: '#101a25', border: '1px solid #1a3a5a', borderRadius: 10,
        padding: '12px 16px', fontSize: '.8125rem', color: '#7ab8e8', marginBottom: 16
      }}>
        {p.desc} 30 дней. Не более 1 часа в день.
      </div>

      {Object.values(DIFFICULTY).map(d => {
        const rew = p.rewards[d.id];
        return (
          <div key={d.id} onClick={() => setSelectedDiff(d.id)}
            style={{
              background: '#1a1d24', border: selectedDiff === d.id ? '2px solid #4f8cff' : '2px solid #2a2e38',
              borderRadius: 16, padding: 20, marginBottom: 12, cursor: 'pointer', transition: 'all .2s'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#4f8cff'}
            onMouseLeave={e => { if (selectedDiff !== d.id) e.currentTarget.style.borderColor = '#2a2e38'; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>{d.name}</div>
              <div style={{ fontSize: '.75rem', color: '#5a6a80' }}>×{d.xpMultiplier} XP</div>
            </div>
            <div style={{ fontSize: '.875rem', color: '#8892a0', marginBottom: 10 }}>{d.desc}</div>
            <div style={{ fontSize: '.75rem', color: '#7ec850', marginTop: 6 }}>
              Награда: {rew.stars}★, {rew.xp} XP, +{rew.sphereProgress} к сфере
            </div>
          </div>
        );
      })}

      {selectedDiff && (
        <div style={{ background: '#1a1d24', border: '1px solid #4f8cff', borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 10 }}>Параметры пути</div>
          <div style={{ fontSize: '.875rem', color: '#b0b8c8', lineHeight: 1.6 }}>
            • Множитель XP: <strong style={{ color: '#4f8cff' }}>×{DIFFICULTY[selectedDiff].xpMultiplier}</strong><br/>
            • Шаги: <strong>30</strong><br/>
            • Макс. время в день: <strong>1 час</strong>
          </div>
          <button onClick={() => startPath(pathId, selectedDiff)} style={{
            background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 12,
            padding: '14px 24px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 12
          }}>
            Начать путь
          </button>
        </div>
      )}

      <button onClick={() => setScreen('path-choice')} style={{
        background: 'transparent', border: '1px solid #4f8cff', color: '#4f8cff',
        borderRadius: 12, padding: '14px 24px', fontSize: '1rem', fontWeight: 600,
        cursor: 'pointer', width: '100%', marginTop: 8
      }}>
        ← Назад
      </button>
    </div>
  );
};
