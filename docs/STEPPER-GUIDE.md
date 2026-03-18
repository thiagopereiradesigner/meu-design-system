# Stepper — Guia do Componente

`Stepper` mostra progresso por etapas com:
- círculos conectados (verde = passos concluídos/atuais; cinza = próximos),
- o nome do step atual logo abaixo,
- opção de ficar `sticky` logo abaixo do header.

---
## 📦 Props

```typescript
interface StepperProps {
  steps: Array<{ label: string }>;
  currentStep: number; // default: 0
  sticky?: boolean; // default: true
  offsetTop?: number; // default: 56
  style?: React.CSSProperties;
  topLabelStyle?: React.CSSProperties;
}
```

---
## 🧩 Uso (exemplo)

```jsx
import { Stepper } from "@/components/ui/Stepper";

<Stepper
  steps={[{ label: "Termos" }, { label: "PIN" }, { label: "Sucesso" }]}
  currentStep={1}
/>
```

---
## ♿ Acessibilidade

- O dot do passo atual recebe `aria-current="step"`.

