import React, { useState } from 'react';
import { useApp } from '../AppContext';

export const ImportScreen: React.FC = () => {
  const { setScreen, importData } = useApp();
  const [json, setJson] = useState('');

  const handleImport = () => {
    if (importData(json)) {
      setScreen('quests');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, color: '#fff' }}>Импорт данных</h1>
      <p style={{ fontSize: '.875rem', color: '#8892a0', marginBottom: 24 }}>Вставь ранее сохранённый JSON</p>
      <textarea
        value={json}
        onChange={e => setJson(e.target.value)}
        style={{
          width: '100%', background: '#0f1115', border: '1px solid #2a2e38', borderRadius: 10,
          padding: 12, color: '#e0e0e0', fontFamily: 'monospace', fontSize: '.8125rem',
          minHeight: 80, resize: 'vertical', marginBottom: 12
        }}
        placeholder='{"version":5,...}'
      />
      <button onClick={handleImport} style={{
        background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 12,
        padding: '14px 24px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', width: '100%', marginBottom: 8
      }}>Импортировать</button>
      <button onClick={() => setScreen('start')} style={{
        background: 'transparent', border: '1px solid #4f8cff', color: '#4f8cff',
        borderRadius: 12, padding: '14px 24px', fontSize: '1rem', fontWeight: 600,
        cursor: 'pointer', width: '100%'
      }}>← Назад</button>
    </div>
  );
};
