# Accordion — Guia do Componente

`Accordion` organiza conteúdo em perguntas/respostas com expand/collapse, seguindo o padrão de acessibilidade do shadcn.

---
## 📦 Componentes

- `Accordion` (raiz)
- `AccordionItem` (define o `value` do item)
- `AccordionTrigger` (botão com `aria-expanded`)
- `AccordionContent` (região com o conteúdo)

---
## 📦 Props (raiz)

```typescript
interface AccordionProps {
  type?: "single" | "multiple"; // default: "single"
  collapsible?: boolean; // default: true
  defaultValue?: string | string[] | null;
  value?: string | string[] | null; // modo controlado
  onValueChange?: (next: any) => void;
  children?: React.ReactNode;
}
```

---
## 🧩 Uso (exemplo)

```jsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

<Accordion type="single" collapsible defaultValue="1">
  <AccordionItem value="1">
    <AccordionTrigger>Primeira pergunta</AccordionTrigger>
    <AccordionContent withDivider>
      Resposta 1...
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---
## 🧱 Divider entre perguntas

O `AccordionContent` tem `withDivider` (default `true`) e renderiza o `Divider` apenas quando o item está aberto, criando o traço “da resposta para a próxima pergunta”.

---
## ♿ Acessibilidade

- `AccordionTrigger` usa `aria-expanded` e `aria-controls`.
- `AccordionContent` usa `role="region"`.

