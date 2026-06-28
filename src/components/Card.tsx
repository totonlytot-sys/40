import React from 'react';

interface Props {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<Props> = ({ title, subtitle, children, style }) => (
  <div style={{
    background: '#1a1d24', border: '1px solid #2a2e38', borderRadius: 16, padding: 20, marginBottom: 16,
    ...style
  }}>
    {title && <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>{title}</div>}
    {subtitle && <div style={{ fontSize: '.875rem', color: '#4f8cff', marginBottom: 12 }}>{subtitle}</div>}
    {children}
  </div>
);
