import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { PATHS, SPHERES } from '../data/constants';

export const PathChoiceScreen: React.FC = () => {
  const { setScreen } = useApp();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>Путь развития</h1>
      <p style={{ fontSize: '.875rem', color: '#8892a0', marginBottom: 24 }}>Куда направишь энергию на ближайшие 30 дней?</p>

      <div style={{
        background: '#101a25', border: '1px solid #1a3a5a', borderRadius: 10,
        padding: '12px 16px', fontSize: '.8125rem', color: '#7ab8e8', marginBottom: 16
      }}>
        Один путь — 30 дней. Можно идти только по одному пути за раз. Заверши — получи звёздочки и открой новые возможности.
      </div>

      {Object.values(PATHS).map(p => {
        const sphere = SPHERES[p.sphere];
        return (
          <div key={p.id} onClick={() => { setSelected(p.id); setScreen('path-start'); }}
            style={{
              background: '#1a1d24', border: selected === p.id ? '2px solid #4f8cff' : '2px solid #2a2e38',
              borderRadius: 16, padding: 20, marginBottom: 16, cursor: 'pointer', transition: 'all .2s'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#4f8cff'}
            onMouseLeave={e => { if (selected !== p.id) e.currentTarget.style.borderColor = '#2a2e38'; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>{p.icon} {p.name}</div>
              <span style={{
                display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: '.6875rem', fontWeight: 600,
                background: sphere.color + '20', color: sphere.color
              }}>{sphere.icon} {sphere.name}</span>
            </div>
            <div style={{ fontSize: '.875rem', color: '#8892a0', marginBottom: 10 }}>{p.desc}</div>
            <div style={{ fontSize: '.75rem', color: '#5a6a80' }}>30 дней • Ежедневные шаги • Не более 1 часа в день</div>
          </div>
        );
      })}

      <button onClick={() => setScreen('archetype')} style={{
        background: 'transparent', border: '1px solid #4f8cff', color: '#4f8cff',
        borderRadius: 12, padding: '14px 24px', fontSize: '1rem', fontWeight: 600,
        cursor: 'pointer', width: '100%', marginTop: 8
      }}>
        ← Назад
      </button>
    </div>
  );
};
