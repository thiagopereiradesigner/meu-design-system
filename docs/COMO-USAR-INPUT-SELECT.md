# Como Usar Input e Select - Guia Prático

## 🎯 Filosofia dos Componentes

**Todos os elementos são OPCIONAIS.** Se você não passar uma prop, ela não aparece. Simples assim!

---

## 📝 Input - Casos de Uso

### 1. Input Mínimo (só o campo)
```jsx
<Input placeholder="Digite algo" />
```
**Quando usar:** Campos simples, busca rápida

---

### 2. Input Padrão (com label)
```jsx
<Input 
  label="Nome"
  placeholder="Digite seu nome"
/>
```
**Quando usar:** Formulários básicos

---

### 3. Input Obrigatório
```jsx
<Input 
  label="Email"
  sublabel="obrigatório"
  placeholder="seu@email.com"
/>
```
**Quando usar:** Campos required do formulário

---

### 4. Input com Helper Text
```jsx
<Input 
  label="Senha"
  type="password"
  placeholder="Digite sua senha"
  helperText="Mínimo 8 caracteres, incluindo números"
/>
```
**Quando usar:** Quando precisa explicar regras/formato

---

### 5. Input com Ícone Info (tooltip implícito)
```jsx
<Input 
  label="CPF"
  sublabel="obrigatório"
  showInfoIcon
  placeholder="000.000.000-00"
  helperText="Apenas números, sem pontos ou traços"
/>
```
**Quando usar:** Label precisa de contexto adicional

---

### 6. Input de Busca
```jsx
<Input 
  placeholder="Buscar produtos..."
  leftIcon={<SearchIcon />}
/>
```
**Quando usar:** Barras de busca, filtros

---

### 7. Input com Erro
```jsx
<Input 
  label="Email"
  sublabel="obrigatório"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError ? "Email inválido" : ""}
/>
```
**Quando usar:** Validação de formulário

---

### 8. Input Completo (tudo junto)
```jsx
<Input 
  label="Email corporativo"
  sublabel="obrigatório"
  showInfoIcon
  type="email"
  placeholder="joao@empresa.com.br"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  leftIcon={<SearchIcon />}
  helperText="Usaremos este email para contato oficial"
  error={errors.email}
/>
```
**Quando usar:** Campos críticos que precisam de todo contexto

---

## 📋 Select - Casos de Uso

### 1. Select Básico
```jsx
<Select 
  label="Estado"
  placeholder="Selecione"
  options={[
    { value: 'sp', label: 'São Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' }
  ]}
/>
```
**Quando usar:** Listas curtas (até 10 opções)

---

### 2. Select Obrigatório
```jsx
<Select 
  label="Categoria"
  sublabel="obrigatório"
  placeholder="Selecione uma categoria"
  options={categorias}
/>
```
**Quando usar:** Campo required

---

### 3. Select com Busca (Searchable)
```jsx
<Select 
  label="País"
  placeholder="Busque um país"
  options={paises}
  searchable
  helperText="Digite para filtrar"
/>
```
**Quando usar:** Listas longas (>10 opções)

---

### 4. Select Controlado
```jsx
const [estado, setEstado] = useState('');

<Select 
  label="Estado"
  value={estado}
  onChange={(option) => setEstado(option.value)}
  options={estados}
/>
```
**Quando usar:** Precisa controlar o valor, validação, dependências

---

### 5. Select com Opção Desabilitada
```jsx
<Select 
  label="Cidade"
  options={[
    { value: 'sp', label: 'São Paulo' },
    { value: 'poa', label: 'Porto Alegre', disabled: true }
  ]}
  helperText="Algumas cidades estão temporariamente indisponíveis"
/>
```
**Quando usar:** Opções que existem mas não podem ser selecionadas agora

---

### 6. Select com Erro
```jsx
<Select 
  label="Plano"
  sublabel="obrigatório"
  options={planos}
  error={!planoSelecionado ? "Selecione um plano" : ""}
/>
```
**Quando usar:** Validação de formulário

---

### 7. Select Desabilitado
```jsx
<Select 
  label="Plano atual"
  value="premium"
  options={planos}
  disabled
  helperText="Entre em contato para alterar seu plano"
/>
```
**Quando usar:** Mostrar valor mas não permitir alteração

---

## 🗣️ Como Pedir pro Cursor/Claude

### ✅ Jeito Natural (RECOMENDADO)

**Você fala assim:**
```
"Crie um formulário de cadastro com:
- Nome (obrigatório)
- Email (obrigatório, com ícone info explicando que será usado para login)
- Telefone (opcional)
- Estado (select com busca)
- Cidade (select que depende do estado)"
```

**Claude entende e gera:**
```jsx
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [telefone, setTelefone] = useState('');
const [estado, setEstado] = useState('');
const [cidade, setCidade] = useState('');

<Input 
  label="Nome"
  sublabel="obrigatório"
  value={nome}
  onChange={(e) => setNome(e.target.value)}
  placeholder="Digite seu nome completo"
/>

<Input 
  label="Email"
  sublabel="obrigatório"
  showInfoIcon
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="seu@email.com"
  helperText="Este email será usado para login"
/>

<Input 
  label="Telefone"
  value={telefone}
  onChange={(e) => setTelefone(e.target.value)}
  placeholder="(00) 00000-0000"
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
  options={getCidadesPorEstado(estado)}
/>
```

---

## 📦 Props de Input

| Prop | Tipo | Default | Aparece quando |
|------|------|---------|----------------|
| `label` | string | - | Você passa o texto |
| `sublabel` | string | - | Você passa o texto |
| `showInfoIcon` | boolean | `false` | Você passa `true` ou só `showInfoIcon` |
| `placeholder` | string | - | Você passa o texto |
| `value` | string | `''` | Campo controlado |
| `onChange` | function | - | Campo controlado |
| `type` | string | `'text'` | Email, password, etc |
| `leftIcon` | ReactElement | - | Você passa `<SearchIcon />` |
| `helperText` | string | - | Você passa o texto |
| `error` | string | - | Validação falhou |
| `disabled` | boolean | `false` | Campo bloqueado |

---

## 📦 Props de Select

| Prop | Tipo | Default | Aparece quando |
|------|------|---------|----------------|
| `label` | string | - | Você passa o texto |
| `sublabel` | string | - | Você passa o texto |
| `showInfoIcon` | boolean | `false` | Você passa `true` |
| `placeholder` | string | - | Você passa o texto |
| `value` | string | `''` | Select controlado |
| `onChange` | function | - | Select controlado |
| `options` | array | `[]` | **OBRIGATÓRIO** - lista de opções |
| `searchable` | boolean | `false` | Listas longas |
| `helperText` | string | - | Você passa o texto |
| `error` | string | - | Validação falhou |
| `disabled` | boolean | `false` | Campo bloqueado |

---

## 🎨 Padrões de Formulário

### Login (minimalista)
```jsx
<Input 
  label="Email"
  type="email"
  placeholder="seu@email.com"
/>

<Input 
  label="Senha"
  type="password"
  placeholder="Digite sua senha"
/>
```

---

### Cadastro (intermediário)
```jsx
<Input 
  label="Nome completo"
  sublabel="obrigatório"
  placeholder="João Silva"
/>

<Input 
  label="Email"
  sublabel="obrigatório"
  type="email"
  placeholder="joao@email.com"
  helperText="Usaremos para login e contato"
/>

<Input 
  label="Telefone"
  placeholder="(00) 00000-0000"
/>

<Select 
  label="Como nos conheceu?"
  options={[
    { value: 'google', label: 'Google' },
    { value: 'indicacao', label: 'Indicação' },
    { value: 'redes', label: 'Redes Sociais' }
  ]}
/>
```

---

### Cadastro Completo (com validação)
```jsx
function CadastroForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    estado: '',
    cidade: ''
  });
  
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // validação...
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input 
        label="Nome completo"
        sublabel="obrigatório"
        showInfoIcon
        value={formData.nome}
        onChange={(e) => setFormData({...formData, nome: e.target.value})}
        placeholder="João Silva"
        error={errors.nome}
        helperText="Nome que aparecerá nos documentos"
      />

      <Input 
        label="Email"
        sublabel="obrigatório"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="joao@email.com"
        error={errors.email}
      />

      <Input 
        label="CPF"
        sublabel="obrigatório"
        showInfoIcon
        value={formData.cpf}
        onChange={(e) => setFormData({...formData, cpf: e.target.value})}
        placeholder="000.000.000-00"
        error={errors.cpf}
        helperText="Apenas números"
      />

      <Select 
        label="Estado"
        sublabel="obrigatório"
        value={formData.estado}
        onChange={(opt) => setFormData({...formData, estado: opt.value})}
        options={estados}
        searchable
        error={errors.estado}
      />

      <Select 
        label="Cidade"
        value={formData.cidade}
        onChange={(opt) => setFormData({...formData, cidade: opt.value})}
        options={getCidadesPorEstado(formData.estado)}
        error={errors.cidade}
        helperText="Selecione o estado primeiro"
      />
    </form>
  );
}
```

---

## 🚫 Anti-padrões

### ❌ Não faça: Placeholder como label
```jsx
// ERRADO
<Input placeholder="Digite seu email" />

// CORRETO
<Input 
  label="Email"
  placeholder="exemplo@email.com"
/>
```

---

### ❌ Não faça: Erro sem mensagem
```jsx
// ERRADO
<Input error />

// CORRETO
<Input error="Este campo é obrigatório" />
```

---

### ❌ Não faça: Select sem placeholder
```jsx
// ERRADO
<Select options={estados} />

// CORRETO
<Select 
  placeholder="Selecione um estado"
  options={estados}
/>
```

---

### ❌ Não faça: Obrigatório sem indicação
```jsx
// ERRADO
<Input label="CPF" />

// CORRETO
<Input 
  label="CPF"
  sublabel="obrigatório"
/>
```

---

## 💡 Dicas Pro

### 1. Campos relacionados
```jsx
// Cidade só habilita se estado selecionado
<Select 
  label="Cidade"
  options={getCidadesPorEstado(estado)}
  disabled={!estado}
  helperText={!estado ? "Selecione o estado primeiro" : ""}
/>
```

---

### 2. Validação em tempo real
```jsx
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const validateEmail = (value) => {
  if (!value.includes('@')) {
    setEmailError('Email inválido');
  } else {
    setEmailError('');
  }
};

<Input 
  label="Email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }}
  error={emailError}
/>
```

---

### 3. Select com contador
```jsx
<Select 
  label="Categoria"
  options={categorias}
  helperText={`${categorias.length} categorias disponíveis`}
/>
```

---

### 4. Input com máscara (CPF, telefone)
```jsx
import { maskCPF } from './utils';

<Input 
  label="CPF"
  value={cpf}
  onChange={(e) => setCpf(maskCPF(e.target.value))}
  placeholder="000.000.000-00"
  maxLength={14}
/>
```

---

## 📝 Checklist Rápido

Antes de usar no projeto:

- [ ] Todos os campos obrigatórios têm `sublabel="obrigatório"`?
- [ ] Labels são descritivos? (não "campo1", "campo2")
- [ ] Placeholders ajudam? (exemplo de formato, não repetição do label)
- [ ] Helper text quando regras não são óbvias?
- [ ] Select com `searchable` se >10 opções?
- [ ] Mensagens de erro são claras e acionáveis?
- [ ] Campos controlados com `value` e `onChange`?

---

## 🎯 Resumo de 1 Linha

**Input:** Se não passar prop, não aparece. Passe só o que precisa.  
**Select:** Igual, mas `options` é obrigatório. Use `searchable` em listas longas.

---

## 🔗 Ver também

- **GUIA-INPUT-SELECT.md** - Documentação técnica completa
- **ButtonComponent.jsx** - Componente de botões
- **GUIA-DE-USO.md** - Guia de botões
