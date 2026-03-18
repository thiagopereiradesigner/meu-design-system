# Divider — Guia do Componente

`Divider` é uma linha separadora (horizontal ou vertical) usada para melhorar leitura e agrupar seções.

---
## 📦 Props

```typescript
interface DividerProps {
  orientation?: "horizontal" | "vertical"; // default: "horizontal"
  color?: string; // default: var(--ds-border)
  thickness?: number; // default: 1
  margin?: number | string; // default: 0
  style?: React.CSSProperties;
}
```

---
## 🧩 Uso (exemplo)

```jsx
<Divider />
<Divider thickness={2} margin="16px 0" color="var(--ds-success)" />
<Divider orientation="vertical" thickness={1} />
```

---
## ♿ Acessibilidade

- Usa `role="separator"` e `aria-orientation` para leitores de tela.

