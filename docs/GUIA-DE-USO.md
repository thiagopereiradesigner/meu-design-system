# Guia de Uso - Componente Button

## 📚 Propriedades (Props)

```typescript
interface ButtonProps {
  children?: React.ReactNode;     // Texto do botão
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'large' | 'medium';
  state?: 'default' | 'hover' | 'focus' | 'active' | 'disabled';
  leftIcon?: React.ReactElement;  // Ícone à esquerda
  rightIcon?: React.ReactElement; // Ícone à direita
  iconOnly?: boolean;             // Se true, mostra apenas ícone
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;             // Obrigatório quando iconOnly=true
}
```

## 🎯 Exemplos de Uso

### 1. Botão completo (ícones + texto)

```jsx
<Button 
  variant="primary" 
  size="large" 
  leftIcon={<PlusIcon />} 
  rightIcon={<ArrowRightIcon />}
  onClick={() => alert('Criar novo!')}
>
  Criar novo
</Button>
```

### 2. Botão só com texto (sem ícones)

```jsx
<Button variant="primary" size="large">
  Salvar
</Button>

<Button variant="secondary" size="medium">
  Cancelar
</Button>
```

### 3. Botão com ícone à esquerda apenas

```jsx
<Button 
  variant="secondary" 
  size="large" 
  leftIcon={<FilterIcon />}
>
  Filtrar resultados
</Button>

<Button 
  variant="outline" 
  size="medium" 
  leftIcon={<PlusIcon />}
>
  Adicionar
</Button>
```

### 4. Botão com ícone à direita apenas

```jsx
<Button 
  variant="outline" 
  size="large" 
  rightIcon={<ArrowRightIcon />}
>
  Ver mais
</Button>

<Button 
  variant="ghost" 
  size="medium" 
  rightIcon={<ArrowRightIcon />}
>
  Próximo
</Button>
```

### 5. Botão icon-only (apenas ícone) ⭐

```jsx
{/* Primary icon-only - Large (48x48px quadrado) */}
<Button 
  variant="primary" 
  size="large" 
  iconOnly
  leftIcon={<PlusIcon />}
  ariaLabel="Adicionar novo item"
  onClick={() => alert('Adicionar!')}
/>

{/* Secondary icon-only - Large */}
<Button 
  variant="secondary" 
  size="large" 
  iconOnly
  leftIcon={<FilterIcon />}
  ariaLabel="Filtrar"
/>

{/* Outline icon-only - Medium (40x40px quadrado) */}
<Button 
  variant="outline" 
  size="medium" 
  iconOnly
  leftIcon={<ArrowRightIcon />}
  ariaLabel="Avançar"
/>

{/* Ghost icon-only - Medium */}
<Button 
  variant="ghost" 
  size="medium" 
  iconOnly
  leftIcon={<PlusIcon />}
  ariaLabel="Criar"
/>
```

**⚠️ IMPORTANTE:** Sempre use `ariaLabel` quando `iconOnly={true}` para acessibilidade!

### 6. Estados especiais

```jsx
{/* Botão desabilitado */}
<Button 
  variant="primary" 
  size="medium" 
  state="disabled"
>
  Botão desabilitado
</Button>

{/* Com ícone desabilitado */}
<Button 
  variant="secondary" 
  size="medium" 
  state="disabled"
  leftIcon={<PlusIcon />}
>
  Com ícone desabilitado
</Button>

{/* Icon-only desabilitado */}
<Button 
  variant="outline" 
  size="medium" 
  iconOnly
  state="disabled"
  leftIcon={<PlusIcon />}
  ariaLabel="Desabilitado"
/>
```

## 💼 Casos de Uso Reais

### Ação primária (Call-to-action)
```jsx
<Button variant="primary" size="large">
  Confirmar pagamento
</Button>
```

### Navegação
```jsx
<Button 
  variant="ghost" 
  size="medium" 
  rightIcon={<ArrowRightIcon />}
>
  Ir para dashboard
</Button>
```

### Ação de filtro
```jsx
<Button 
  variant="secondary" 
  size="medium" 
  leftIcon={<FilterIcon />}
>
  Aplicar filtros
</Button>
```

### FAB (Floating Action Button)
```jsx
<Button 
  variant="primary" 
  size="large" 
  iconOnly 
  leftIcon={<PlusIcon />} 
  ariaLabel="Criar novo"
  style={{ 
    position: 'fixed', 
    bottom: '24px', 
    right: '24px' 
  }}
/>
```

### Toolbar actions (conjunto de botões icon-only)
```jsx
<div style={{ display: 'flex', gap: '8px' }}>
  <Button 
    variant="ghost" 
    size="medium" 
    iconOnly 
    leftIcon={<PlusIcon />} 
    ariaLabel="Adicionar" 
  />
  <Button 
    variant="ghost" 
    size="medium" 
    iconOnly 
    leftIcon={<FilterIcon />} 
    ariaLabel="Filtrar" 
  />
  <Button 
    variant="ghost" 
    size="medium" 
    iconOnly 
    leftIcon={<ArrowRightIcon />} 
    ariaLabel="Avançar" 
  />
</div>
```

## 🎨 Variantes

### Primary
- Uso: Ação principal da tela
- Background: `#04843B` (verde brand)
- Texto: `#FFFFFF` (branco)
- Exemplo: "Salvar", "Confirmar", "Criar"

### Secondary
- Uso: Ações secundárias importantes
- Background: `#E6F4ED` (verde claro)
- Texto: `#067647` (verde escuro)
- Exemplo: "Filtrar", "Exportar"

### Outline
- Uso: Ações alternativas
- Background: `transparent`
- Borda: `#067647`
- Texto: `#067647`
- Exemplo: "Ver mais", "Detalhes"

### Ghost
- Uso: Ações terciárias ou menos destaque
- Background: `transparent` (sem borda)
- Texto: `#067647`
- Exemplo: "Cancelar", "Voltar"

## 📏 Tamanhos

### Large (L)
- Altura: `48px`
- Font-size: `14px`
- Uso: Ações principais, CTAs, formulários

### Medium (M)
- Altura: `40px`
- Font-size: `12px`
- Uso: Toolbars, tabelas, listas

## ♿ Acessibilidade

### Botões com texto
```jsx
<Button variant="primary">
  Salvar
</Button>
// ✅ Texto já serve como label acessível
```

### Botões icon-only
```jsx
<Button 
  iconOnly 
  leftIcon={<PlusIcon />}
  ariaLabel="Adicionar novo item"
/>
// ✅ ariaLabel descreve a ação para leitores de tela
```

### Estados de foco
- Todos os botões têm focus ring visível (3px verde)
- Navegação por teclado funciona nativamente

### Contrast ratio
- Primary: 4.5:1 (WCAG AA ✅)
- Secondary: 4.5:1 (WCAG AA ✅)
- Outline: 4.5:1 (WCAG AA ✅)
- Ghost: 4.5:1 (WCAG AA ✅)

### Tamanho mínimo de toque
- Large: 48x48px (WCAG 2.5.5 AAA ✅)
- Medium: 40x40px (WCAG 2.5.5 AA ✅)

## 🚫 Anti-padrões (O que NÃO fazer)

### ❌ Icon-only sem ariaLabel
```jsx
// ERRADO - Inacessível para leitores de tela
<Button iconOnly leftIcon={<PlusIcon />} />

// CORRETO
<Button 
  iconOnly 
  leftIcon={<PlusIcon />} 
  ariaLabel="Adicionar novo item"
/>
```

### ❌ Mais de um botão primary na mesma tela
```jsx
// ERRADO - Confunde hierarquia visual
<Button variant="primary">Salvar</Button>
<Button variant="primary">Enviar</Button>

// CORRETO - Apenas uma ação primária
<Button variant="primary">Salvar</Button>
<Button variant="secondary">Cancelar</Button>
```

### ❌ Botão desabilitado sem explicação
```jsx
// ERRADO - Usuário não sabe por que está desabilitado
<Button state="disabled">Confirmar</Button>

// CORRETO - Com tooltip explicativo
<Tooltip content="Preencha todos os campos obrigatórios">
  <Button state="disabled">Confirmar</Button>
</Tooltip>
```

## 🔄 Migrações de código antigo

### Se você tem:
```jsx
// Código antigo
<button className="btn-primary">Salvar</button>
```

### Migre para:
```jsx
// Novo componente
<Button variant="primary">Salvar</Button>
```

### Se você tem:
```jsx
// Código antigo com ícone
<button className="btn-secondary">
  <i className="icon-filter"></i>
  Filtrar
</button>
```

### Migre para:
```jsx
// Novo componente
<Button 
  variant="secondary" 
  leftIcon={<FilterIcon />}
>
  Filtrar
</Button>
```

## 📦 Importação

```jsx
import { Button } from './components/Button';
import { PlusIcon, FilterIcon, ArrowRightIcon } from './components/Icons';

function MeuComponente() {
  return (
    <div>
      <Button variant="primary" size="large">
        Criar novo
      </Button>
      
      <Button 
        variant="secondary" 
        leftIcon={<FilterIcon />}
      >
        Filtrar
      </Button>
      
      <Button 
        iconOnly 
        leftIcon={<PlusIcon />} 
        ariaLabel="Adicionar"
      />
    </div>
  );
}
```

## 📝 Resumo Rápido

| Caso de uso | Código |
|-------------|--------|
| Só texto | `<Button>Texto</Button>` |
| Texto + ícone esquerda | `<Button leftIcon={<Icon />}>Texto</Button>` |
| Texto + ícone direita | `<Button rightIcon={<Icon />}>Texto</Button>` |
| Texto + ambos ícones | `<Button leftIcon={<Icon1 />} rightIcon={<Icon2 />}>Texto</Button>` |
| Só ícone | `<Button iconOnly leftIcon={<Icon />} ariaLabel="Ação" />` |
| Desabilitado | `<Button state="disabled">Texto</Button>` |
