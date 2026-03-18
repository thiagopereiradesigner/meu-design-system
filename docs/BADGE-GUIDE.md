# Badge — Guia do Componente

O `Badge` comunica status/categoria com identidade visual por tipo (success/error/warning/info/neutral).

Ele suporta variação **com ícone** e **sem ícone**.

---

## 📦 Props

```typescript
interface BadgeProps {
  variant?: 'success' | 'error' | 'warning' | 'info' | 'neutral';
  size?: 'small' | 'medium';
  showIcon?: boolean;          // default: false
  icon?: React.ReactElement;  // override opcional
  showRightIcon?: boolean;     // default: false
  rightIcon?: React.ReactElement; // override opcional (chevron à direita, por exemplo)
  children?: React.ReactNode;
}
```

---

## 🔗 Ícones por tipo (padrão)
- `success`: check circle
- `error`: circle x
- `warning`: triangle alert
- `info`: circle alert
- `neutral`: dot

---

## 🧩 Uso (exemplos)

### Sem ícone

```jsx
<Badge variant="success">Ativo</Badge>
<Badge variant="warning">Atenção</Badge>
```

### Com ícone

```jsx
<Badge variant="success" showIcon>
  Ativo
</Badge>

<Badge variant="error" showIcon size="small">
  Erro
</Badge>
```

### Com ícone à direita (ex.: `chevron-right`)
```jsx
<Badge variant="info" showRightIcon>
  Detalhes
</Badge>

<Badge variant="success" showIcon showRightIcon>
  Ativo
</Badge>
```

---

## ♿ Acessibilidade

- `Badge` não é necessariamente um componente “anunciador” (não use `role="alert"`).
- Se for informação crítica, acrescente texto adicional na interface (ou um `Alert` inline).

---

## White-label (tema)

Para manter multi-parceiro, `Badge` consome cores via CSS variables:
- `--ds-success-bg`, `--ds-success-fg`
- `--ds-error-bg`, `--ds-error-fg`
- `--ds-warning-bg`, `--ds-warning-fg`
- `--ds-info-bg`, `--ds-info-fg`

