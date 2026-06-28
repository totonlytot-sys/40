import React from 'react';

interface Props {
  progress: number;
}

export const ProgressBar: React.FC<Props> = ({ progress }) => (
  <div style={{ width: '100%', height: 4, background: '#1e2127', borderRadius: 2, marginBottom: 24, overflow: 'hidden' }}>
    <div style={{ height: '100%', background: '#4f8cff', transition: 'width .3s', width: `${progress}%` }} />
  </div>
);
