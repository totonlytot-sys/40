import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { ARCHETYPES, SPHERES, SPHERE_ORDER, LEVELS, PATHS, DIFFICULTY } from '../data/constants';

export const ProfileScreen: React.FC = () => {
  const { state, setScreen, resetAll, exportData } = useApp();
  const [showExport, setShowExport] = useState(false);

  const arch = ARCHETYPES[state.archetype || 'nomad'];
  const pathText = state.activePath && !state.activePath.completed
    ? `${PATHS[state.activePath.id].icon} ${PATHS[state.activePath.id].name} • День ${state.activePath.day}/30 • ${DIFFICULTY[state.activePath.difficulty].name}`
    : state.completedPaths.length > 0
    ? `${PATHS[state.completedPaths[state.completedPaths.length - 1].id].icon} ${PATHS[state.completedPaths[state.completedPaths.length - 1].id].name} (завершён)`
    : 'Нет активного пути';

  const lvl = LEVELS.find(l => l.num === state.level) || LEVELS[0];

  const copyExport = () => {
    navigator.clipboard.writeText(exportData()).then(() => alert('📋 Скопировано'));
  };

  const downloadExport = () => {
    const t = exportData();
    const b = new Blob([t], { type: 'application/json' });
    const u = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href = u;
    a.download = `life-system-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(u);
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>Профиль</h1>
      <p style={{ fontSize: '.875rem', color: '#8892a0', marginBottom: 24 }}>
        Уровень {state.level} — {LEVELS[state.level - 1]?.name}
      </p>

      {/* Main card */}
      <div style={{ background: '#1a1d24', border: '1px solid #2a2e38', borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>{arch.icon} {arch.name}</div>
            <div style={{ fontSize: '.875rem', color: '#4f8cff' }}>{pathText}</div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#4f8cff' }}>LVL {state.level}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {SPHERE_ORDER.map(s => {
            const sphere = SPHERES[s];
            const sl = state.sphereLevels[s] || 1;
            const sp = state.sphereProgress[s] || 0;
            const needed = sl * 100;
            const isDominant = arch.dominant.includes(s);
            return (
              <div key={s} style={{
                textAlign: 'center', padding: '12px 4px', background: '#0f1115', borderRadius: 10,
                border: isDominant ? `1px solid ${sphere.color}` : '1px solid #2a2e38'
              }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: isDominant ? sphere.color : '#fff' }}>{sl}</div>
                <div style={{ fontSize: '.625rem', textTransform: 'uppercase', letterSpacing: '.05em', color: '#8892a0', marginTop: 4 }}>
                  {sphere.icon} {sphere.name}
                </div>
                <div style={{ width: '100%', height: 3, background: '#0f1115', borderRadius: 2, marginTop: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(sp / needed) * 100}%`, background: sphere.color, borderRadius: 2 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* XP bar */}
      <div style={{ background: '#1a1d24', borderRadius: 10, padding: 14, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.8125rem', marginBottom: 8 }}>
          <span style={{ color: '#8892a0' }}>Опыт</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>{state.xp} / {lvl.xpTo} XP</span>
        </div>
        <div style={{ width: '100%', height: 8, background: '#0f1115', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: '#4f8cff', borderRadius: 4, transition: 'width .5s', width: `${(state.xp / lvl.xpTo) * 100}%` }} />
        </div>
      </div>

      {/* Stars */}
      <div style={{ background: '#1a1d24', border: '1px solid #2a2e38', borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ fontWeight: 600, color: '#fff', marginBottom: 12 }}>
          Звёздочки: <span style={{ color: '#f59e0b' }}>{state.stars}</span>
        </div>
        <div style={{ fontSize: '.8125rem', color: '#8892a0' }}>
          Награда за завершённые пути и челленджи. Потом станут валютой.
        </div>
      </div>

      {/* Level progress */}
      <div style={{ background: '#1a1d24', border: '1px solid #2a2e38', borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ fontWeight: 600, color: '#fff', marginBottom: 12 }}>Прогресс уровней</div>
        {LEVELS.map(l => (
          <div key={l.num} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '.75rem', fontWeight: 700,
              background: l.num <= state.level ? '#4f8cff' : '#2a2e38',
              color: l.num <= state.level ? '#fff' : '#5a6a80'
            }}>{l.num}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '.875rem', fontWeight: 600, color: l.num <= state.level ? '#fff' : '#5a6a80' }}>{l.name}</div>
            </div>
            {l.num === state.level && <div style={{ fontSize: '.75rem', color: '#4f8cff', fontWeight: 600 }}>→</div>}
          </div>
        ))}
      </div>

      {/* Completed paths */}
      <div style={{ background: '#1a1d24', border: '1px solid #2a2e38', borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ fontWeight: 600, color: '#fff', marginBottom: 12 }}>Завершённые пути</div>
        {state.completedPaths.length === 0
          ? <div style={{ fontSize: '.875rem', color: '#5a6a80', textAlign: 'center', padding: '20px 0' }}>Нет завершённых путей</div>
          : state.completedPaths.map(cp => (
              <div key={cp.id + cp.completedAt} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #2a2e38' }}>
                <div style={{ fontSize: '.875rem', color: '#b0b8c8' }}>{PATHS[cp.id].icon} {PATHS[cp.id].name}</div>
                <div style={{ fontSize: '.875rem', color: '#7ec850' }}>{DIFFICULTY[cp.difficulty].name}</div>
              </div>
            ))}
      </div>

      {/* Active challenges */}
      <div style={{ background: '#1a1d24', border: '1px solid #2a2e38', borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ fontWeight: 600, color: '#fff', marginBottom: 12 }}>Активные челленджи</div>
        {state.activeChallenges.length === 0
          ? <div style={{ fontSize: '.875rem', color: '#5a6a80', textAlign: 'center', padding: '20px 0' }}>Нет активных челленджей</div>
          : state.activeChallenges.map(ac => (
              <div key={ac.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #2a2e38' }}>
                <div style={{ fontSize: '.875rem', color: '#b0b8c8' }}>{ac.id}</div>
                <div style={{ fontSize: '.875rem', color: '#4f8cff' }}>{ac.current} дн.</div>
              </div>
            ))}
      </div>

      {/* Export */}
      <div style={{ background: '#1a1d24', border: '1px solid #2a2e38', borderRadius: 16, padding: 20, marginBottom: 16 }}>
        <div style={{ fontWeight: 600, color: '#fff', marginBottom: 12 }}>Экспорт данных</div>
        {showExport && (
          <pre style={{
            background: '#0f1115', border: '1px solid #2a2e38', borderRadius: 10, padding: 12,
            fontFamily: 'monospace', fontSize: '.75rem', color: '#8892a0', wordBreak: 'break-all',
            maxHeight: 120, overflowY: 'auto', marginBottom: 12
          }}>{exportData()}</pre>
        )}
        <button onClick={() => setShowExport(!showExport)} style={{
          background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 12,
          padding: '14px 24px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', width: '100%', marginBottom: 8
        }}>
          {showExport ? 'Скрыть' : 'Показать'} JSON
        </button>
        {showExport && (
          <>
            <button onClick={copyExport} style={{
              background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 12,
              padding: '14px 24px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', width: '100%', marginBottom: 8
            }}>Копировать JSON</button>
            <button onClick={downloadExport} style={{
              background: 'transparent', border: '1px solid #4f8cff', color: '#4f8cff',
              borderRadius: 12, padding: '14px 24px', fontSize: '1rem', fontWeight: 600,
              cursor: 'pointer', width: '100%'
            }}>Скачать файл</button>
          </>
        )}
      </div>

      <button onClick={resetAll} style={{
        background: 'transparent', border: '1px solid #4f8cff', color: '#4f8cff',
        borderRadius: 12, padding: '14px 24px', fontSize: '1rem', fontWeight: 600,
        cursor: 'pointer', width: '100%'
      }}>
        Сбросить всё
      </button>

      <p style={{ fontSize: '.75rem', color: '#5a6a80', textAlign: 'center', marginTop: 16 }}>
        Экспортируй данные перед обновлением браузера или сменой устройства.
      </p>

      {/* Nav */}
      <div style={{ display: 'flex', gap: 8, marginTop: 24, overflowX: 'auto', paddingBottom: 4 }}>
        {['quests', 'challenges', 'profile'].map(tab => (
          <button key={tab} onClick={() => setScreen(tab)} style={{
            padding: '8px 14px', borderRadius: 8, border: '1px solid #2a2e38',
            background: tab === 'profile' ? '#1a2235' : '#1a1d24',
            color: tab === 'profile' ? '#4f8cff' : '#8892a0',
            fontSize: '.8125rem', cursor: 'pointer', whiteSpace: 'nowrap',
            fontWeight: tab === 'profile' ? 600 : 500
          }}>
            {tab === 'quests' ? 'Квесты' : tab === 'challenges' ? 'Челленджи' : 'Профиль'}
          </button>
        ))}
      </div>
    </div>
  );
};
