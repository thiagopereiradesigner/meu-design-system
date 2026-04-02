import { Button } from '@meu-ds/react';

export function App() {
  return (
    <div
      style={{
        fontFamily: 'var(--ds-font-family)',
        background: 'var(--ds-bg)',
        color: 'var(--ds-fg)',
        minHeight: '100vh',
        padding: 'var(--ds-space-xl)',
        maxWidth: '40rem',
        margin: '0 auto',
      }}
    >
      <h1 style={{ color: 'var(--ds-success)', marginBottom: 'var(--ds-space-md)' }}>
        @meu-ds/react — playground
      </h1>
      <p style={{ color: 'var(--ds-fg-muted)', marginBottom: 'var(--ds-space-xl)' }}>
        Tokens carregados a partir de <code>demos/ds-demo-base.css</code> (mesma base das demos HTML).
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-space-md)' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  );
}
