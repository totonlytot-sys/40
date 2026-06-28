import React from 'react';
import { useApp } from '../AppContext';
import { ProgressBar } from '../components/ProgressBar';
import { QUESTIONS } from '../data/constants';

export const SurveyScreen: React.FC = () => {
  const { state, answerQuestion } = useApp();
  const current = state.answers.length;
  const q = QUESTIONS[current];

  if (!q) return null;

  return (
    <div>
      <ProgressBar progress={(current / QUESTIONS.length) * 100} />
      <div style={{ fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em', color: '#4f8cff', marginBottom: 8 }}>
        Вопрос {current + 1} из {QUESTIONS.length}
      </div>
      <div style={{ fontSize: '1.125rem', fontWeight: 600, color: '#fff', marginBottom: 20 }}>
        {q.text}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {q.options.map(opt => (
          <div key={opt.label} onClick={() => answerQuestion(opt)} style={{
            background: '#1a1d24', border: '1px solid #2a2e38', borderRadius: 12, padding: 16,
            cursor: 'pointer', transition: 'all .2s', fontSize: '.9375rem',
          }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#4f8cff'; e.currentTarget.style.background = '#1e2230'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2e38'; e.currentTarget.style.background = '#1a1d24'; }}>
            <span style={{ fontWeight: 600, color: '#4f8cff', marginRight: 8 }}>{opt.label}.</span>
            {opt.text}
          </div>
        ))}
      </div>
    </div>
  );
};
