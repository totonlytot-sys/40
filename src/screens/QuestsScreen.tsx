import React, { useEffect, useState } from 'react';
import { useApp } from '../AppContext';
import { TopBar } from '../components/TopBar';
import { SPHERES, PATHS } from '../data/constants';

export const QuestsScreen: React.FC = () => {
  const {
    state, setScreen, completeMainStep, toggleSideQuest, completeDailyChallenge,
    saveJournal, generateSideQuests, generateDailyChallenge, checkMissedDays, getTodayStr
  } = useApp();
  const [journalText, setJournalText] = useState('');

  useEffect(() => {
    checkMissedDays();
    generateSideQuests();
    generateDailyChallenge();
  }, []);

  useEffect(() => {
    const today = getTodayStr();
    const entry = state.journal?.find(e => e.date === today);
    setJournalText(entry?.text || '');
  }, [state.journal, getTodayStr]);

  const today = getTodayStr();
  const p = state.activePath ? PATHS[state.activePath.id] : null;
  const step = p ? p.steps[state.activePath!.day - 1] : null;

  const formatDateRu = (ds: string) => {
    const d = new Date(ds + 'T00:00:00');
    const m = ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
    return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`;
  };
  const getDayOfWeek = (ds: string) => {
    const days = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
    return days[new Date(ds + 'T00:00:00').getDay()];
  };

  return (
    <div>
      <TopBar />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{
          display: 'inline-block', padding: '4px 10px', borderRadius: 8,
          background: '#1a2235', color: '#4f8cff', fontSize: '.875rem', fontWeight: 600
        }}>
          {state.activePath && !state.activePath.completed ? `День ${state.activePath.day} / 30` : 'Нет активного пути'}
        </div>
        <div style={{ fontSize: '.875rem', color: '#8892a0' }}>
          {formatDateRu(today)}, {getDayOfWeek(today)}
        </div>
      </div>

      {/* Path progress dots */}
      {state.activePath && !state.activePath.completed && (
        <div style={{ display: 'flex', gap: 4, margin: '16px 0', flexWrap: 'wrap' }}>
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: i < (state.activePath?.day || 1) - 1 ? '#7ec850' : i === (state.activePath?.day || 1) - 1 ? '#4f8cff' : '#2a2e38',
              boxShadow: i === (state.activePath?.day || 1) - 1 ? '0 0 0 3px rgba(79,140,255,.2)' : 'none'
            }} />
          ))}
        </div>
      )}

      {/* Main quest */}
      {step && (
        <div style={{
          background: state.activePath?.stepDoneToday ? '#101a15' : '#1a1d24',
          border: state.activePath?.stepDoneToday ? '1px solid #2a5a3a' : '1px solid #2a2e38',
          borderRadius: 14, padding: 16, marginBottom: 12
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontWeight: 600, fontSize: '1rem', color: '#fff' }}>Шаг {step.day}: {step.title}</div>
            <div style={{ fontSize: '.75rem', padding: '3px 8px', borderRadius: 6, background: '#1a2235', color: '#4f8cff', fontWeight: 600 }}>
              +{step.xp} XP
            </div>
          </div>
          <div style={{ fontSize: '.8125rem', color: '#8892a0', marginBottom: 10 }}>{step.desc}</div>
          <div style={{ fontSize: '.75rem', color: '#5a6a80', marginBottom: 8 }}>⏱ {step.time} • {p?.icon} {p?.name}</div>
          <button onClick={completeMainStep} disabled={state.activePath?.stepDoneToday} style={{
            padding: '8px 16px', borderRadius: 8, border: '1px solid #2a2e38',
            background: state.activePath?.stepDoneToday ? '#1a3010' : '#0f1115',
            color: state.activePath?.stepDoneToday ? '#7ec850' : '#8892a0',
            fontSize: '.8125rem', cursor: state.activePath?.stepDoneToday ? 'default' : 'pointer',
            fontWeight: 500
          }}>
            {state.activePath?.stepDoneToday ? '✓ Выполнено' : 'Выполнить шаг'}
          </button>
        </div>
      )}

      {/* Daily challenge */}
      {state.dailyChallenge && (
        <div style={{
          background: state.dailyChallenge.done ? '#101a15' : '#1a1d24',
          border: state.dailyChallenge.done ? '1px solid #2a5a3a' : '1px solid #f59e0b',
          borderRadius: 14, padding: 16, marginBottom: 12
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontWeight: 600, fontSize: '1rem', color: '#fff' }}>🔥 Ежедневный челлендж</div>
            <div style={{ fontSize: '.75rem', padding: '3px 8px', borderRadius: 6, background: '#1a2235', color: '#4f8cff', fontWeight: 600 }}>
              +{state.dailyChallenge.xp} XP
            </div>
          </div>
          <div style={{ fontSize: '.8125rem', color: '#8892a0', marginBottom: 10 }}>{state.dailyChallenge.desc}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {state.dailyChallenge.spheres.map(s => (
              <span key={s} style={{
                display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: '.6875rem', fontWeight: 600,
                background: SPHERES[s].color + '20', color: SPHERES[s].color
              }}>{SPHERES[s].icon} {SPHERES[s].name}</span>
            ))}
          </div>
          <div style={{ fontSize: '.75rem', color: '#5a6a80', marginBottom: 8 }}>
            Серия: {state.dailyChallengeStreak} дн. • Бонус 30 дней: +100★
          </div>
          <button onClick={completeDailyChallenge} disabled={state.dailyChallenge.done} style={{
            padding: '8px 16px', borderRadius: 8, border: '1px solid #2a2e38',
            background: state.dailyChallenge.done ? '#1a3010' : '#0f1115',
            color: state.dailyChallenge.done ? '#7ec850' : '#8892a0',
            fontSize: '.8125rem', cursor: state.dailyChallenge.done ? 'default' : 'pointer',
            fontWeight: 500
          }}>
            {state.dailyChallenge.done ? '✓ Выполнено' : 'Выполнить челлендж'}
          </button>
        </div>
      )}

      {/* Side quests */}
      <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#fff', margin: '24px 0 12px' }}>Побочные квесты</h2>
      {state.sideQuests?.quests.map((q, idx) => {
        const sphere = SPHERES[q.sphere];
        return (
          <div key={q.id} style={{
            background: q.done ? '#101a15' : '#0f1115',
            border: q.done ? '1px solid #2a5a3a' : '1px solid #2a2e38',
            borderRadius: 12, padding: 14, marginBottom: 10
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontWeight: 600, fontSize: '.9375rem', color: '#fff' }}>{q.title}</div>
              <div style={{ fontSize: '.75rem', color: '#7ec850' }}>+{q.xp} XP • +{q.progress} {sphere.name}</div>
            </div>
            <div style={{ fontSize: '.8125rem', color: '#8892a0', marginBottom: 8 }}>{q.desc}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{
                display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: '.6875rem', fontWeight: 600,
                background: sphere.color + '20', color: sphere.color
              }}>{sphere.icon} {sphere.name}</span>
              <button onClick={() => toggleSideQuest(idx)} style={{
                padding: '8px 16px', borderRadius: 8, border: '1px solid #2a2e38',
                background: q.done ? '#1a3010' : '#0f1115',
                color: q.done ? '#7ec850' : '#8892a0',
                fontSize: '.8125rem', cursor: 'pointer', fontWeight: 500
              }}>
                {q.done ? '✓ Выполнено' : 'Выполнить'}
              </button>
            </div>
          </div>
        );
      })}

      {/* Journal */}
      <div style={{ background: '#1a1d24', border: '1px solid #2a2e38', borderRadius: 16, padding: 20, marginTop: 24 }}>
        <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 10 }}>📝 Дневник дня</div>
        <textarea
          value={journalText}
          onChange={e => setJournalText(e.target.value)}
          style={{
            width: '100%', background: '#0f1115', border: '1px solid #2a2e38', borderRadius: 10,
            padding: 12, color: '#e0e0e0', fontFamily: 'monospace', fontSize: '.8125rem',
            minHeight: 80, resize: 'vertical', marginBottom: 8
          }}
          placeholder="Свободная запись о дне..."
        />
        <button onClick={() => saveJournal(journalText)} style={{
          background: 'transparent', border: '1px solid #4f8cff', color: '#4f8cff',
          borderRadius: 12, padding: '8px 16px', fontSize: '.8125rem', fontWeight: 600,
          cursor: 'pointer'
        }}>
          Сохранить запись
        </button>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', gap: 8, marginTop: 24, overflowX: 'auto', paddingBottom: 4 }}>
        {['quests', 'challenges', 'profile'].map(tab => (
          <button key={tab} onClick={() => setScreen(tab)} style={{
            padding: '8px 14px', borderRadius: 8, border: '1px solid #2a2e38',
            background: tab === 'quests' ? '#1a2235' : '#1a1d24',
            color: tab === 'quests' ? '#4f8cff' : '#8892a0',
            fontSize: '.8125rem', cursor: 'pointer', whiteSpace: 'nowrap',
            fontWeight: tab === 'quests' ? 600 : 500
          }}>
            {tab === 'quests' ? 'Квесты' : tab === 'challenges' ? 'Челленджи' : 'Профиль'}
          </button>
        ))}
      </div>
    </div>
  );
};
