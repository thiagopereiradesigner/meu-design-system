# Alert inline — Guia do Componente

O `Alert` é um aviso **inline** (dentro do layout), com ícone e cores por tipo.

Ele é o “parente” do Toast: usa o mesmo vocabulário visual (success/error/warning/info), mas:
- não é fixo na tela
- não auto-oculta
- pode ser **dispensável** (dismiss)
- tem opção de renderizar **texto** ou somente **ícone**.

---

## 📦 Props

```typescript
interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  variant?: 'active' | 'light';  // default: 'active'
  title?: string;
  message?: string;
  showText?: boolean;            // default: true (quando false: mostra ícone + título, mas oculta o body (message))
  maxWidth?: number;            // default: 720 (limita a largura do alerta inline)
  dismissible?: boolean;        // default: true
  onDismiss?: () => void;
}
```

---

## 🔗 Uso (exemplos)

### Ícone + texto

```jsx
<Alert
  type="error"
  title="Erro"
  message="Revise os campos obrigatórios."
/>
```

### Ícone sem texto (reduz ruído visual)

```jsx
<Alert
  type="warning"
  showText={false}
  title="Atenção"
/>
```

---

## ♿ Acessibilidade

- Usa `role="alert"` para leitura por screen readers.
- Garanta que o `Alert` esteja no contexto certo do fluxo (ex.: erro após submissão).

---

## White-label (tema)

`Alert` consome cores via CSS variables:
- `--ds-success`, `--ds-success-bg`, `--ds-success-fg`
- `--ds-error`, `--ds-error-bg`, `--ds-error-fg`
- `--ds-warning`, `--ds-warning-bg`, `--ds-warning-fg`
- `--ds-info`, `--ds-info-bg`, `--ds-info-fg`

