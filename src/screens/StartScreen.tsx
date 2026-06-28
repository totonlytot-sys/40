import React from 'react';
import { useApp } from '../AppContext';
import { Card } from '../components/Card';
import { SPHERES, SPHERE_ORDER } from '../data/constants';

export const StartScreen: React.FC = () => {
  const { state, setScreen, startSurvey, resetAll } = useApp();

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>ЖИЗНЬ</h1>
      <p style={{ fontSize: '.875rem', color: '#8892a0', marginBottom: 24 }}>Система развития. 6 сфер. Реальные действия.</p>

      <Card title="Как это работает">
        <p style={{ fontSize: '.9375rem', color: '#b0b8c8', marginBottom: 12 }}>
          Пройди анкету — система определит твой архетип. Выбери путь развития (30 дней). Выполняй ежедневные шаги, копи опыт и звёздочки, прокачивай сферы жизни.
        </p>
        <p style={{ fontSize: '.8125rem', color: '#5a6a80', borderLeft: '2px solid #2a2e38', paddingLeft: 10 }}>
          Не мотивация. Система: путь → шаг → опыт → прокачка.
        </p>
      </Card>

      <Card title="6 сфер жизни">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 12 }}>
          {SPHERE_ORDER.map(s => {
            const sp = SPHERES[s];
            return (
              <div key={s} style={{
                textAlign: 'center', padding: '12px 4px', background: '#0f1115', borderRadius: 10,
                border: `1px solid ${sp.color}40`
              }}>
                <div style={{ fontSize: '1.25rem', color: sp.color }}>{sp.icon}</div>
                <div style={{ fontSize: '.625rem', textTransform: 'uppercase', letterSpacing: '.05em', color: '#8892a0', marginTop: 4 }}>{sp.name}</div>
              </div>
            );
          })}
        </div>
      </Card>

      <button onClick={startSurvey} style={{
        background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 24px',
        fontSize: '1rem', fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 8, transition: 'background .2s'
      }} onMouseEnter={e => e.currentTarget.style.background = '#3a7aee'}
        onMouseLeave={e => e.currentTarget.style.background = '#4f8cff'}>
        Начать анкету
      </button>

      <button onClick={() => setScreen('import')} style={{
        background: 'transparent', border: '1px solid #4f8cff', color: '#4f8cff',
        borderRadius: 12, padding: '14px 24px', fontSize: '1rem', fontWeight: 600,
        cursor: 'pointer', width: '100%', marginTop: 8
      }}>
        Импорт данных
      </button>

      <button onClick={resetAll} style={{
        background: '#3a2020', border: '1px solid #e05a5a', color: '#e05a5a',
        borderRadius: 12, padding: '14px 24px', fontSize: '1rem', fontWeight: 600,
        cursor: 'pointer', width: '100%', marginTop: 8
      }}>
        🗑 Сбросить данные
      </button>

      <p style={{ fontSize: '.75rem', color: '#5a6a80', textAlign: 'center', marginTop: 16 }}>
        Данные хранятся в браузере. Экспортируй перед обновлением.
      </p>
    </div>
  );
};
