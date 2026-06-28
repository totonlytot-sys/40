import React, { useEffect } from 'react';
import { useApp } from '../AppContext';
import { Card } from '../components/Card';
import { ARCHETYPES, SPHERES, SPHERE_ORDER } from '../data/constants';

export const ArchetypeScreen: React.FC = () => {
  const { state, setScreen, calculateArchetype, startSurvey } = useApp();

  useEffect(() => {
    if (!state.archetype) calculateArchetype();
  }, [state.archetype, calculateArchetype]);

  const arch = ARCHETYPES[state.archetype || 'nomad'];
  const sp = state.spheres;

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>Твой архетип</h1>
      <p style={{ fontSize: '.875rem', color: '#8892a0', marginBottom: 24 }}>Результат анкеты — баланс 6 сфер</p>

      <div style={{
        background: '#1a1d24', border: `2px solid ${arch.color}`, borderRadius: 16, padding: 20, marginBottom: 16
      }}>
        <div style={{ fontSize: '2rem', marginBottom: 8 }}>{arch.icon}</div>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{arch.name}</div>
        <div style={{ fontSize: '.875rem', color: arch.color, marginBottom: 8 }}>{arch.tagline}</div>
        <div style={{ fontSize: '.9375rem', color: '#b0b8c8', marginBottom: 12 }}>{arch.desc}</div>
        <div style={{ fontSize: '.8125rem', color: '#7ec850' }}>{arch.bonus}</div>
      </div>

      <Card title="Баланс сфер">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 16 }}>
          {SPHERE_ORDER.map(s => {
            const sphere = SPHERES[s];
            const isDominant = arch.dominant.includes(s);
            return (
              <div key={s} style={{
                textAlign: 'center', padding: '12px 4px', background: '#0f1115', borderRadius: 10,
                border: isDominant ? `1px solid ${sphere.color}` : '1px solid #2a2e38'
              }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: isDominant ? sphere.color : '#fff' }}>
                  {sp[s] > 0 ? '+' : ''}{sp[s]}
                </div>
                <div style={{ fontSize: '.625rem', textTransform: 'uppercase', letterSpacing: '.05em', color: '#8892a0', marginTop: 4 }}>
                  {sphere.icon} {sphere.name}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{
          background: '#0f1115', borderLeft: '3px solid #4f8cff', borderRadius: '0 8px 8px 0',
          padding: '14px 16px', fontSize: '.875rem', color: '#b0b8c8', marginTop: 16
        }}>
          {state.archetype === 'nomad'
            ? 'Почему Кочевник: Силы распределены равномерно. Это точка отсчёта. Выбери путь и начни собирать данные.'
            : state.archetype === 'rebel'
            ? 'Почему Бунтарь: Паттерн «заглушаю/ломаю». Сейчас не время для дисциплины — время для осознания. Начни с малого.'
            : state.archetype === 'recluse'
            ? 'Почему Затворник: Все сферы на низком уровне. Режим и духовность — твой выход.'
            : `Почему ${arch.name}: Доминирующие сферы — ${arch.dominant.map(s => SPHERES[s].name + ' (' + sp[s] + ')').join(' и ')}.`}
        </div>
      </Card>

      <button onClick={() => setScreen('path-choice')} style={{
        background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 24px',
        fontSize: '1rem', fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 8
      }}>
        Выбрать путь →
      </button>
      <button onClick={startSurvey} style={{
        background: 'transparent', border: '1px solid #4f8cff', color: '#4f8cff',
        borderRadius: 12, padding: '14px 24px', fontSize: '1rem', fontWeight: 600,
        cursor: 'pointer', width: '100%', marginTop: 8
      }}>
        Пройти заново
      </button>
    </div>
  );
};
