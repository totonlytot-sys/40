import React from 'react';
import { useApp } from '../AppContext';
import { CHALLENGES, SPHERES } from '../data/constants';

export const ChallengesScreen: React.FC = () => {
  const { state, setScreen, buyChallenge, checkChallengeDay } = useApp();

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>Челленджи</h1>
      <p style={{ fontSize: '.875rem', color: '#8892a0', marginBottom: 24 }}>Инвестируй звёздочки — получи удвоение + статы</p>

      <div style={{
        background: '#101a25', border: '1px solid #1a3a5a', borderRadius: 10,
        padding: '12px 16px', fontSize: '.8125rem', color: '#7ab8e8', marginBottom: 16
      }}>
        Купи челлендж за звёзды. Выполняй ежедневные условия. Получи удвоение вложенных звёзд + опыт + прокачку сферы.
      </div>

      {/* Active challenges */}
      {state.activeChallenges.length > 0 && (
        <>
          <div style={{ fontSize: '.8125rem', fontWeight: 600, color: '#fff', marginBottom: 10, textTransform: 'uppercase' }}>Активные</div>
          {state.activeChallenges.map(ac => {
            const ch = CHALLENGES.find(c => c.id === ac.id);
            if (!ch) return null;
            const sphere = SPHERES[ch.sphere];
            const pct = Math.min(100, Math.round(ac.current / ch.duration * 100));
            return (
              <div key={ac.id} style={{
                background: '#1a1d24', border: '1px solid #7ec850', borderRadius: 14,
                padding: 16, marginBottom: 12
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{ch.name}</div>
                  <span style={{
                    display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: '.6875rem', fontWeight: 600,
                    background: sphere.color + '20', color: sphere.color
                  }}>{sphere.icon}</span>
                </div>
                <div style={{ fontSize: '.8125rem', color: '#8892a0', marginBottom: 8 }}>{ch.desc}</div>
                <div style={{ fontSize: '.8125rem', color: '#7ec850' }}>
                  Награда: {ch.rewardXp} XP, {ch.rewardStars}★, +{ch.progressReward} {sphere.name}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', color: '#8892a0', marginTop: 6 }}>
                  <span>{ac.current} / {ch.duration} дн.</span>
                  <span>{pct}%</span>
                </div>
                <div style={{ width: '100%', height: 6, background: '#0f1115', borderRadius: 3, overflow: 'hidden', marginTop: 8 }}>
                  <div style={{ height: '100%', background: '#7ec850', borderRadius: 3, transition: 'width .3s', width: `${pct}%` }} />
                </div>
                <button onClick={() => checkChallengeDay(ac.id)} style={{
                  background: 'transparent', border: '1px solid #4f8cff', color: '#4f8cff',
                  borderRadius: 8, padding: '6px 12px', fontSize: '.8125rem', fontWeight: 500,
                  cursor: 'pointer', marginTop: 8
                }}>
                  Отметить сегодня
                </button>
              </div>
            );
          })}
        </>
      )}

      {/* Available challenges */}
      <div style={{ fontSize: '.8125rem', fontWeight: 600, color: '#fff', margin: '16px 0 10px', textTransform: 'uppercase' }}>Доступные</div>
      {CHALLENGES.filter(ch => !state.activeChallenges.some(a => a.id === ch.id)).map(ch => {
        const sphere = SPHERES[ch.sphere];
        return (
          <div key={ch.id} style={{
            background: '#1a1d24', border: '1px solid #2a2e38', borderRadius: 14,
            padding: 16, marginBottom: 12, cursor: 'pointer', transition: 'all .2s'
          }} onMouseEnter={e => e.currentTarget.style.borderColor = '#4f8cff'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2e38'}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{ch.name}</div>
              <div style={{
                fontSize: '.75rem', padding: '3px 8px', borderRadius: 6,
                background: '#1a1510', color: '#f59e0b', fontWeight: 600
              }}>{ch.cost}★</div>
            </div>
            <div style={{ fontSize: '.8125rem', color: '#8892a0', marginBottom: 8 }}>{ch.desc}</div>
            <div style={{ fontSize: '.8125rem', color: '#7ec850' }}>
              Награда: {ch.rewardXp} XP, {ch.rewardStars}★ (удвоение), +{ch.progressReward} {sphere.name}
            </div>
            <button onClick={() => buyChallenge(ch.id)} style={{
              background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 8,
              padding: '6px 12px', fontSize: '.8125rem', fontWeight: 500,
              cursor: 'pointer', marginTop: 8
            }}>
              Купить за {ch.cost}★
            </button>
          </div>
        );
      })}

      {/* Nav */}
      <div style={{ display: 'flex', gap: 8, marginTop: 24, overflowX: 'auto', paddingBottom: 4 }}>
        {['quests', 'challenges', 'profile'].map(tab => (
          <button key={tab} onClick={() => setScreen(tab)} style={{
            padding: '8px 14px', borderRadius: 8, border: '1px solid #2a2e38',
            background: tab === 'challenges' ? '#1a2235' : '#1a1d24',
            color: tab === 'challenges' ? '#4f8cff' : '#8892a0',
            fontSize: '.8125rem', cursor: 'pointer', whiteSpace: 'nowrap',
            fontWeight: tab === 'challenges' ? 600 : 500
          }}>
            {tab === 'quests' ? 'Квесты' : tab === 'challenges' ? 'Челленджи' : 'Профиль'}
          </button>
        ))}
      </div>
    </div>
  );
};
