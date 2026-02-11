# Guia de Uso - Input & Select Components

## 📚 Input Component

### Propriedades (Props)

```typescript
interface InputProps {
  label?: string;              // Label principal
  sublabel?: string;           // Texto adicional ao lado do label
  placeholder?: string;        // Texto de placeholder
  value?: string;              // Valor controlado
  onChange?: (e) => void;      // Callback de mudança
  error?: string;              // Mensagem de erro
  helperText?: string;         // Texto de ajuda
  disabled?: boolean;          // Estado desabilitado
  leftIcon?: React.ReactElement; // Ícone à esquerda
  showInfoIcon?: boolean;      // Mostra ícone de info no label
  type?: string;               // Tipo do input (text, email, password, etc)
}
```

### Exemplos de Uso - Input

#### 1. Input básico (só texto)
```jsx
<Input 
  label="Nome"
  placeholder="Digite seu nome"
/>
```

#### 2. Input com sublabel e ícone info
```jsx
<Input 
  label="Email"
  sublabel="obrigatório"
  showInfoIcon
  placeholder="seu@email.com"
  helperText="Usaremos este email para contato"
/>
```

#### 3. Input com ícone de busca
```jsx
<Input 
  label="Buscar"
  placeholder="Buscar produtos..."
  leftIcon={<SearchIcon />}
/>
```

#### 4. Input controlado (com estado)
```jsx
const [value, setValue] = useState('');

<Input 
  label="Nome completo"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Digite seu nome"
/>
```

#### 5. Input com erro
```jsx
<Input 
  label="CPF"
  sublabel="obrigatório"
  placeholder="000.000.000-00"
  error="CPF inválido"
/>
```

#### 6. Input desabilitado
```jsx
<Input 
  label="Campo bloqueado"
  placeholder="Este campo está desabilitado"
  disabled
  helperText="Entre em contato para habilitar"
/>
```

#### 7. Input de senha
```jsx
<Input 
  label="Senha"
  type="password"
  placeholder="Digite sua senha"
  helperText="Mínimo 8 caracteres"
/>
```

---

## 📋 Select Component

### Propriedades (Props)

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;              // Label principal
  sublabel?: string;           // Texto adicional ao lado do label
  placeholder?: string;        // Texto quando nada selecionado
  value?: string;              // Valor selecionado (controlado)
  onChange?: (option) => void; // Callback quando seleciona
  options: SelectOption[];     // Array de opções
  error?: string;              // Mensagem de erro
  helperText?: string;         // Texto de ajuda
  disabled?: boolean;          // Estado desabilitado
  showInfoIcon?: boolean;      // Mostra ícone de info no label
  searchable?: boolean;        // Habilita busca nas opções
}
```

### Exemplos de Uso - Select

#### 1. Select básico
```jsx
<Select 
  label="Estado"
  placeholder="Selecione um estado"
  options={[
    { value: 'sp', label: 'São Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' },
    { value: 'mg', label: 'Minas Gerais' }
  ]}
/>
```

#### 2. Select controlado
```jsx
const [estado, setEstado] = useState('');

<Select 
  label="Estado"
  sublabel="obrigatório"
  placeholder="Selecione"
  value={estado}
  onChange={(option) => setEstado(option.value)}
  options={estados}
  showInfoIcon
  helperText="Selecione o estado onde você mora"
/>
```

#### 3. Select com busca (searchable)
```jsx
<Select 
  label="País"
  placeholder="Busque um país"
  options={paises}
  searchable
  helperText="Digite para filtrar"
/>
```

#### 4. Select com opção desabilitada
```jsx
<Select 
  label="Cidade"
  options={[
    { value: 'sp', label: 'São Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' },
    { value: 'poa', label: 'Porto Alegre', disabled: true }
  ]}
  helperText="Algumas opções podem estar indisponíveis"
/>
```

#### 5. Select com erro
```jsx
<Select 
  label="Categoria"
  sublabel="obrigatório"
  placeholder="Selecione uma categoria"
  options={categorias}
  error="Este campo é obrigatório"
/>
```

#### 6. Select desabilitado
```jsx
<Select 
  label="Plano"
  placeholder="Plano não alterável"
  options={planos}
  disabled
  helperText="Entre em contato para alterar"
/>
```

---

## 💼 Casos de Uso Reais

### Formulário de Cadastro

```jsx
function CadastroForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');

  return (
    <form>
      <Input 
        label="Nome completo"
        sublabel="obrigatório"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite seu nome"
        showInfoIcon
        helperText="Como você gostaria de ser chamado?"
      />

      <Input 
        label="Email"
        sublabel="obrigatório"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        helperText="Usaremos este email para contato"
      />

      <Select 
        label="Estado"
        sublabel="obrigatório"
        placeholder="Selecione"
        value={estado}
        onChange={(opt) => setEstado(opt.value)}
        options={estados}
        searchable
      />

      <Select 
        label="Cidade"
        placeholder="Selecione"
        value={cidade}
        onChange={(opt) => setCidade(opt.value)}
        options={cidades}
      />
    </form>
  );
}
```

### Busca e Filtros

```jsx
function SearchFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  return (
    <div>
      <Input 
        placeholder="Buscar produtos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        leftIcon={<SearchIcon />}
      />

      <Select 
        label="Categoria"
        placeholder="Todas"
        value={category}
        onChange={(opt) => setCategory(opt.value)}
        options={categorias}
      />

      <Select 
        label="Status"
        placeholder="Todos"
        value={status}
        onChange={(opt) => setStatus(opt.value)}
        options={[
          { value: 'active', label: 'Ativo' },
          { value: 'inactive', label: 'Inativo' }
        ]}
      />
    </div>
  );
}
```

---

## 🎨 Estados Visuais

### Input

| Estado | Descrição | Uso |
|--------|-----------|-----|
| **Default** | Estado inicial | Campo vazio, sem interação |
| **Focus** | Campo focado | Usuário clicou/tabulou no campo |
| **Filled** | Campo preenchido | Usuário digitou algo |
| **Error** | Campo com erro | Validação falhou |
| **Disabled** | Campo desabilitado | Não pode ser editado |

### Select

| Estado | Descrição | Uso |
|--------|-----------|-----|
| **Default** | Nada selecionado | Mostra placeholder |
| **Open** | Dropdown aberto | Usuário clicou para selecionar |
| **Selected** | Opção selecionada | Mostra valor escolhido |
| **Hover** | Mouse sobre opção | Feedback visual |
| **Error** | Seleção obrigatória | Validação falhou |
| **Disabled** | Campo desabilitado | Não pode ser alterado |

---

## 🎯 Design Tokens Utilizados

### Cores

```javascript
// Bordas
border.secondary: '#DDDDDD'  // Default
border.focus: '#04843B'      // Focus
border.error: '#DC2626'      // Error

// Conteúdo
content.primary: '#393939'   // Texto principal
content.secondary: '#5E5E5E' // Sublabel, helper
content.tertiary: '#727272'  // Placeholder

// Backgrounds
neutral.0: '#FFFFFF'         // Campo
neutral.50: '#F9F9F9'        // Disabled
primary.50: '#E6F4ED'        // Hover select
```

### Espaçamentos

```javascript
spacing.xxs: '4px'   // Label gap
spacing.xs: '8px'    // Icon gap, helper gap
spacing.sm: '12px'   // Padding vertical
spacing.md: '16px'   // Padding horizontal
```

### Tipografia

```javascript
// Label
fontSize.sm: '12px'
fontWeight.semibold: 600

// Input/Select
fontSize.md: '14px'
fontWeight.regular: 400

// Helper
fontSize.xs: '10px'
fontWeight.regular: 400
```

### Sombras

```javascript
shadows.focus: '0 0 0 3px rgba(4, 132, 59, 0.1)'
shadows.error: '0 0 0 3px rgba(220, 38, 38, 0.1)'
shadows.dropdown: '0 4px 12px rgba(0, 0, 0, 0.15)'
```

---

## ♿ Acessibilidade

### Input

✅ **Boas práticas:**
- Label sempre visível (não usar só placeholder)
- Helper text fornece contexto adicional
- Estados de erro claramente identificados com cor + ícone
- Focus ring visível (3px)
- Contrast ratio 4.5:1 (WCAG AA)

❌ **Evitar:**
- Input sem label
- Erro só com cor (sem texto)
- Placeholder como label

### Select

✅ **Boas práticas:**
- Chevron indica que é clicável
- Opção selecionada marcada com check
- Opções desabilitadas claramente identificadas
- Searchable para listas longas
- Focus ring visível

❌ **Evitar:**
- Muitas opções sem busca (>10 itens)
- Opções desabilitadas sem explicação
- Dropdown muito largo

---

## 🚫 Anti-padrões

### ❌ Label só com placeholder

```jsx
// ERRADO
<Input placeholder="Nome completo" />

// CORRETO
<Input 
  label="Nome completo"
  placeholder="Ex: João Silva"
/>
```

### ❌ Erro sem mensagem

```jsx
// ERRADO
<Input error />

// CORRETO
<Input error="Este campo é obrigatório" />
```

### ❌ Select sem placeholder claro

```jsx
// ERRADO
<Select 
  placeholder="..."
  options={estados}
/>

// CORRETO
<Select 
  placeholder="Selecione um estado"
  options={estados}
/>
```

### ❌ Campo obrigatório sem indicação

```jsx
// ERRADO
<Input label="Email" />

// CORRETO
<Input 
  label="Email"
  sublabel="obrigatório"
  showInfoIcon
/>
```

---

## 📦 Importação

```jsx
import { Input, Select } from './components/Forms';
import { SearchIcon } from './components/Icons';

function MyForm() {
  return (
    <>
      <Input 
        label="Nome"
        placeholder="Digite seu nome"
      />
      
      <Select 
        label="Estado"
        options={estados}
        searchable
      />
    </>
  );
}
```

---

## 🔄 Diferenças Input vs Select

| Característica | Input | Select |
|---------------|-------|--------|
| **Entrada** | Texto livre | Opções predefinidas |
| **Ícone direita** | Opcional | Chevron (sempre) |
| **Busca** | Nativa (type="search") | Prop `searchable` |
| **Validação** | Regex, length, etc | Opção válida |
| **Uso típico** | Nome, email, busca | Estado, categoria, status |

---

## 📝 Checklist de Validação

Antes de usar Input/Select em produção:

- [ ] Label descritivo presente
- [ ] Placeholder útil (não substitui label)
- [ ] Helper text quando necessário
- [ ] Estado de erro com mensagem clara
- [ ] Ícone info quando label precisa explicação
- [ ] Sublabel "obrigatório" em campos required
- [ ] Select com `searchable` se >10 opções
- [ ] Opções disabled têm motivo claro
- [ ] Testado com teclado (Tab, Enter)
- [ ] Contrast ratio validado (4.5:1)
