# Form Components - Guia Completo

## 📋 Componentes Incluídos

- **Textarea** - Campo de texto multi-linha
- **Checkbox** - Seleção múltipla
- **Radio** - Seleção única
- **Switch** - Toggle on/off

---

## 🎨 Design Tokens

Todos os componentes usam os mesmos tokens do Design System Portal Empresa:

```javascript
const tokens = {
  colors: {
    primary: {
      50: '#E6F4ED',   // Focus shadow
      500: '#04843B',  // Checked, borders
      700: '#005A1A',  // Dark variant
    },
    neutral: {
      0: '#FFFFFF',
      50: '#F9F9F9',   // Disabled background
      200: '#C6C6C6',  // Switch track (off)
    },
    content: {
      primary: '#393939',
      secondary: '#5E5E5E',
      tertiary: '#727272',
    },
    border: {
      secondary: '#DDDDDD', // Default borders
    },
    semantic: {
      error: '#DC2626',
    },
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
  },
  borderRadius: {
    xs: '4px',
    sm: '8px',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: {
      sm: '12px',
      md: '14px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },
};
```

---

# 1. Textarea

## 📦 Props

```typescript
interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  rows?: number;              // Default: 4
  maxLength?: number;
  showCharCount?: boolean;    // Mostra contador "50/500"
  resize?: 'vertical' | 'horizontal' | 'both' | 'none'; // Default: 'vertical'
  required?: boolean;
}
```

---

## 🚀 Uso Básico

```jsx
import { Textarea } from '@/components/ui/FormComponents';

function MyForm() {
  const [comment, setComment] = useState('');

  return (
    <Textarea
      label="Comentário"
      placeholder="Digite seu comentário..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    />
  );
}
```

---

## 💡 Exemplos

### **Com contador de caracteres:**
```jsx
<Textarea
  label="Descrição"
  placeholder="Descreva o problema..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  maxLength={500}
  showCharCount
  helperText="Seja o mais específico possível"
/>
```

### **Com validação:**
```jsx
<Textarea
  label="Comentário"
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  error={!comment ? 'Campo obrigatório' : ''}
  required
/>
```

### **Desabilitado:**
```jsx
<Textarea
  label="Conteúdo"
  value="Não editável"
  disabled
/>
```

### **Sem redimensionar:**
```jsx
<Textarea
  label="Mensagem"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  resize="none"
  rows={6}
/>
```

---

## 🎨 Estados Visuais

| Estado | Aparência |
|--------|-----------|
| **Default** | Borda `#DDDDDD` |
| **Focus** | Borda `#04843B` + shadow `#E6F4ED` |
| **Error** | Borda `#DC2626` + texto erro vermelho |
| **Disabled** | Background `#F9F9F9`, texto `#727272` |

---

## ♿ Acessibilidade

- ✅ `aria-invalid` quando error
- ✅ `aria-describedby` para helper text/error
- ✅ Label associado ao textarea
- ✅ Contraste 4.5:1 (WCAG AA)

---

## 🎯 Casos de Uso

- Comentários e reviews
- Descrições longas
- Feedback de usuário
- Mensagens de contato
- Notas e observações

---

# 2. Checkbox

## 📦 Props

```typescript
interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;  // Estado "meio selecionado"
  error?: string;
  helperText?: string;
}
```

---

## 🚀 Uso Básico

```jsx
import { Checkbox } from '@/components/ui/FormComponents';

function MyForm() {
  const [accepted, setAccepted] = useState(false);

  return (
    <Checkbox
      label="Aceito os termos e condições"
      checked={accepted}
      onChange={setAccepted}
    />
  );
}
```

---

## 💡 Exemplos

### **Com validação:**
```jsx
<Checkbox
  label="Aceito os termos de uso"
  checked={termsAccepted}
  onChange={setTermsAccepted}
  error={!termsAccepted ? 'Você deve aceitar os termos' : ''}
/>
```

### **Com helper text:**
```jsx
<Checkbox
  label="Receber newsletter"
  checked={newsletter}
  onChange={setNewsletter}
  helperText="Você pode cancelar a qualquer momento"
/>
```

### **Desabilitado:**
```jsx
<Checkbox
  label="Opção desabilitada"
  checked
  disabled
/>
```

### **Indeterminate (checkbox "parcial"):**
```jsx
<Checkbox
  label="Selecionar todos"
  checked={false}
  indeterminate={someSelected}
  onChange={handleSelectAll}
  helperText="Alguns itens estão selecionados"
/>
```

---

## 🎨 Estados Visuais

| Estado | Aparência |
|--------|-----------|
| **Unchecked** | Borda `#DDDDDD`, fundo branco |
| **Checked** | Fundo `#04843B`, check branco |
| **Indeterminate** | Fundo `#04843B`, traço branco |
| **Disabled** | Opacity 50% |

---

## ♿ Acessibilidade

- ✅ `aria-invalid` quando error
- ✅ `aria-describedby` para helper text
- ✅ Touch target 44x44px
- ✅ Keyboard navegável

---

## 🎯 Casos de Uso

- Aceitar termos
- Selecionar múltiplas opções
- Configurações on/off
- Lista de permissões
- Filtros de busca

---

# 3. Radio & RadioGroup

## 📦 Props Radio

```typescript
interface RadioProps {
  label?: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  value?: string;
  error?: string;
  helperText?: string;
}
```

## 📦 Props RadioGroup

```typescript
interface RadioGroupProps {
  label?: string;
  options: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  name?: string;
  direction?: 'vertical' | 'horizontal'; // Default: 'vertical'
}
```

---

## 🚀 Uso Básico

```jsx
import { RadioGroup } from '@/components/ui/FormComponents';

function MyForm() {
  const [paymentMethod, setPaymentMethod] = useState('credit');

  return (
    <RadioGroup
      label="Método de pagamento"
      name="payment"
      value={paymentMethod}
      onChange={setPaymentMethod}
      options={[
        { label: 'Cartão de crédito', value: 'credit' },
        { label: 'Cartão de débito', value: 'debit' },
        { label: 'PIX', value: 'pix' },
        { label: 'Boleto', value: 'boleto' },
      ]}
    />
  );
}
```

---

## 💡 Exemplos

### **Com validação:**
```jsx
<RadioGroup
  label="Gênero"
  name="gender"
  value={gender}
  onChange={setGender}
  error={!gender ? 'Selecione uma opção' : ''}
  options={[
    { label: 'Masculino', value: 'male' },
    { label: 'Feminino', value: 'female' },
    { label: 'Outro', value: 'other' },
  ]}
/>
```

### **Horizontal:**
```jsx
<RadioGroup
  label="Tamanho"
  name="size"
  direction="horizontal"
  value={size}
  onChange={setSize}
  options={[
    { label: 'P', value: 'small' },
    { label: 'M', value: 'medium' },
    { label: 'G', value: 'large' },
  ]}
/>
```

### **Com opção desabilitada:**
```jsx
<RadioGroup
  label="Plano"
  name="plan"
  value={plan}
  onChange={setPlan}
  options={[
    { label: 'Básico', value: 'basic' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise', disabled: true },
  ]}
  helperText="Plano Enterprise disponível em breve"
/>
```

### **Grupo desabilitado:**
```jsx
<RadioGroup
  label="Categoria"
  disabled
  options={[
    { label: 'Opção 1', value: '1' },
    { label: 'Opção 2', value: '2' },
  ]}
/>
```

---

## 🎨 Estados Visuais

| Estado | Aparência |
|--------|-----------|
| **Unchecked** | Borda `#DDDDDD`, fundo branco |
| **Checked** | Borda `#04843B`, dot `#04843B` |
| **Disabled** | Opacity 50% |

---

## ♿ Acessibilidade

- ✅ `role="radiogroup"` no grupo
- ✅ `aria-invalid` quando error
- ✅ `name` obrigatório para agrupar radios
- ✅ Touch target 44x44px
- ✅ Keyboard navegável (arrow keys)

---

## 🎯 Casos de Uso

- Método de pagamento
- Gênero
- Tamanho/Quantidade
- Tipo de entrega
- Planos de assinatura
- Qualquer escolha única entre opções

---

# 4. Switch

## 📦 Props

```typescript
interface SwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';      // Default: 'medium'
  labelPosition?: 'left' | 'right'; // Default: 'right'
}
```

---

## 🚀 Uso Básico

```jsx
import { Switch } from '@/components/ui/FormComponents';

function Settings() {
  const [notifications, setNotifications] = useState(false);

  return (
    <Switch
      label="Ativar notificações"
      checked={notifications}
      onChange={setNotifications}
    />
  );
}
```

---

## 💡 Exemplos

### **Tamanho pequeno:**
```jsx
<Switch
  label="Modo compacto"
  size="small"
  checked={compact}
  onChange={setCompact}
/>
```

### **Label à esquerda:**
```jsx
<Switch
  label="Sincronização automática"
  labelPosition="left"
  checked={autoSync}
  onChange={setAutoSync}
/>
```

### **Desabilitado:**
```jsx
<Switch
  label="Recurso indisponível"
  disabled
/>
```

### **Múltiplos switches:**
```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <Switch
    label="Notificações push"
    checked={pushNotif}
    onChange={setPushNotif}
  />
  
  <Switch
    label="Notificações por email"
    checked={emailNotif}
    onChange={setEmailNotif}
  />
  
  <Switch
    label="Notificações SMS"
    checked={smsNotif}
    onChange={setSmsNotif}
  />
</div>
```

---

## 🎨 Estados Visuais

| Estado | Aparência |
|--------|-----------|
| **Off** | Track `#C6C6C6`, thumb à esquerda |
| **On** | Track `#04843B`, thumb à direita |
| **Disabled** | Opacity 50% |

### **Tamanhos:**
- **Small:** 36px × 20px
- **Medium:** 44px × 24px

---

## ♿ Acessibilidade

- ✅ `role="switch"` implícito
- ✅ Keyboard navegável (Space/Enter)
- ✅ Touch target 44x44px
- ✅ Visual feedback claro

---

## 🎯 Casos de Uso

- Ativar/desativar notificações
- Modo escuro
- Configurações binárias
- Features toggles
- Preferências do usuário
- Sincronização

---

# 🎨 Formulário Completo (Exemplo)

```jsx
import { 
  Input, 
  Textarea, 
  Checkbox, 
  RadioGroup, 
  Switch,
  Button 
} from '@/components/ui';

function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    gender: '',
    terms: false,
    newsletter: false,
    notifications: false,
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nome obrigatório';
    if (!formData.email) newErrors.email = 'Email obrigatório';
    if (!formData.terms) newErrors.terms = 'Aceite os termos';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
      <Input
        label="Nome completo"
        placeholder="Digite seu nome..."
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        required
      />

      <Input
        label="Email"
        type="email"
        placeholder="seu@email.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        required
      />

      <Textarea
        label="Bio"
        placeholder="Conte um pouco sobre você..."
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        maxLength={200}
        showCharCount
        rows={4}
        helperText="Compartilhe seus interesses"
      />

      <RadioGroup
        label="Gênero"
        name="gender"
        value={formData.gender}
        onChange={(value) => setFormData({ ...formData, gender: value })}
        options={[
          { label: 'Masculino', value: 'male' },
          { label: 'Feminino', value: 'female' },
          { label: 'Outro', value: 'other' },
          { label: 'Prefiro não dizer', value: 'not_say' },
        ]}
        helperText="Esta informação é opcional"
      />

      <div style={{ borderTop: '1px solid #DDDDDD', paddingTop: '16px' }}>
        <Checkbox
          label="Aceito os termos de uso e política de privacidade"
          checked={formData.terms}
          onChange={(checked) => setFormData({ ...formData, terms: checked })}
          error={errors.terms}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Checkbox
          label="Quero receber a newsletter semanal"
          checked={formData.newsletter}
          onChange={(checked) => setFormData({ ...formData, newsletter: checked })}
          helperText="Você pode cancelar a qualquer momento"
        />

        <Switch
          label="Ativar notificações push"
          checked={formData.notifications}
          onChange={(checked) => setFormData({ ...formData, notifications: checked })}
        />
      </div>

      <Button type="submit" variant="primary" size="large">
        Criar conta
      </Button>
    </form>
  );
}
```

---

# 📊 Comparação: Checkbox vs Radio vs Switch

| Feature | Checkbox | Radio | Switch |
|---------|----------|-------|--------|
| **Seleção** | Múltipla | Única | Toggle |
| **Estados** | Checked / Unchecked / Indeterminate | Checked / Unchecked | On / Off |
| **Uso** | Aceitar termos, filtros, permissões | Escolha única (pagamento, gênero) | Ativar/desativar features |
| **Visual** | Quadrado com check | Círculo com dot | Track + thumb |
| **Grupo** | Independentes | Agrupados (mesmo `name`) | Independentes |

---

# 🚫 Anti-padrões

## ❌ Não use Checkbox para escolha única:
```jsx
// ERRADO
<Checkbox label="Masculino" />
<Checkbox label="Feminino" />

// CORRETO
<RadioGroup options={[
  { label: 'Masculino', value: 'male' },
  { label: 'Feminino', value: 'female' }
]} />
```

## ❌ Não use Radio para múltiplas seleções:
```jsx
// ERRADO
<RadioGroup options={[
  { label: 'Email', value: 'email' },
  { label: 'SMS', value: 'sms' }
]} />

// CORRETO
<Checkbox label="Notificar por email" />
<Checkbox label="Notificar por SMS" />
```

## ❌ Não use Switch para aceitar termos:
```jsx
// ERRADO
<Switch label="Aceito os termos" />

// CORRETO
<Checkbox label="Aceito os termos e condições" />
```

## ❌ Não use Textarea para textos curtos:
```jsx
// ERRADO
<Textarea label="Nome" rows={1} />

// CORRETO
<Input label="Nome" />
```

---

# ✅ Boas Práticas

## **1. Labels claros e descritivos:**
```jsx
// Ruim
<Checkbox label="Aceitar" />

// Bom
<Checkbox label="Aceito os termos de uso e política de privacidade" />
```

## **2. Helper text para contexto:**
```jsx
<Textarea
  label="Motivo da reclamação"
  helperText="Seja o mais específico possível para agilizar o atendimento"
  maxLength={500}
  showCharCount
/>
```

## **3. Validação clara:**
```jsx
<RadioGroup
  label="Forma de envio"
  error={!shippingMethod ? 'Selecione uma opção de envio' : ''}
  options={shippingOptions}
/>
```

## **4. Agrupar relacionados:**
```jsx
<fieldset>
  <legend>Preferências de notificação</legend>
  <Switch label="Email" checked={email} onChange={setEmail} />
  <Switch label="SMS" checked={sms} onChange={setSms} />
  <Switch label="Push" checked={push} onChange={setPush} />
</fieldset>
```

## **5. Estados desabilitados com razão:**
```jsx
<Switch
  label="Notificações por SMS"
  disabled
  helperText="Adicione um número de telefone para habilitar"
/>
```

---

# 🎯 Quando Usar Cada Um?

## **Use Textarea quando:**
- ✅ Texto esperado > 50 caracteres
- ✅ Comentários, reviews, feedback
- ✅ Descrições longas
- ✅ Mensagens

## **Use Checkbox quando:**
- ✅ Seleção múltipla
- ✅ Aceitar termos
- ✅ Filtros
- ✅ Permissões
- ✅ Cada opção é independente

## **Use Radio quando:**
- ✅ Seleção única obrigatória
- ✅ 2-5 opções visíveis
- ✅ Mutuamente exclusivas
- ✅ Todas as opções devem estar visíveis

## **Use Switch quando:**
- ✅ On/Off binário
- ✅ Efeito imediato
- ✅ Ativar/desativar features
- ✅ Configurações

---

# ♿ Checklist de Acessibilidade

- [ ] Labels associados aos inputs
- [ ] Contraste mínimo 4.5:1 (WCAG AA)
- [ ] Touch targets mínimo 44x44px
- [ ] Keyboard navegável (Tab, Space, Enter, Arrow keys)
- [ ] `aria-invalid` em estados de erro
- [ ] `aria-describedby` para helper text
- [ ] `role` apropriado (radiogroup, switch)
- [ ] Estados visuais claros (focus, disabled, error)
- [ ] Mensagens de erro descritivas
- [ ] Helper text quando necessário

---

# 🎨 Customização

## **Tamanhos personalizados:**
```jsx
// Textarea maior
<Textarea rows={10} />

// Switch pequeno
<Switch size="small" />
```

## **Controle de resize:**
```jsx
// Textarea sem resize
<Textarea resize="none" />

// Resize horizontal
<Textarea resize="horizontal" />
```

## **Posicionamento do label:**
```jsx
// Label à esquerda do switch
<Switch labelPosition="left" />
```

---

# 📦 Estrutura de Arquivos

```
src/
├── components/
│   └── ui/
│       ├── FormComponents.jsx
│       ├── Button.jsx
│       ├── Input.jsx
│       └── Select.jsx
```

## **Import:**
```jsx
import { 
  Textarea, 
  Checkbox, 
  Radio, 
  RadioGroup,
  Switch 
} from '@/components/ui/FormComponents';
```

---

# 🚀 Performance

## **Textarea:**
- ✅ Debounce onChange se necessário
- ✅ Evite maxLength muito altos (>10k)

## **RadioGroup:**
- ✅ Memoize options se muito grande
- ✅ Use key estável nos options

## **Switch:**
- ✅ Debounce se trigger API calls
- ✅ Loading state se assíncrono

---

# 🧪 Testing

```jsx
// Textarea
const textarea = screen.getByLabelText('Comentário');
fireEvent.change(textarea, { target: { value: 'Texto' } });
expect(textarea).toHaveValue('Texto');

// Checkbox
const checkbox = screen.getByLabelText('Aceito');
fireEvent.click(checkbox);
expect(checkbox).toBeChecked();

// Radio
const radio = screen.getByLabelText('PIX');
fireEvent.click(radio);
expect(radio).toBeChecked();

// Switch
const toggle = screen.getByLabelText('Notificações');
fireEvent.click(toggle);
expect(toggle).toBeChecked();
```

---

# 📝 Changelog

**v1.0.0 - Inicial**
- ✅ Textarea com contador de caracteres
- ✅ Checkbox com indeterminate state
- ✅ Radio com RadioGroup
- ✅ Switch com 2 tamanhos
- ✅ Todos WCAG AA compliant
- ✅ Estados: default, focus, error, disabled
- ✅ Helper text e validação
- ✅ Animações suaves
- ✅ Keyboard navigation

---

# 🔗 Recursos

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [Form Design Patterns](https://www.smashingmagazine.com/printed-books/form-design-patterns/)

---

# 🎉 Resumo

**4 componentes essenciais para formulários completos:**
1. **Textarea** - Textos longos com contador
2. **Checkbox** - Seleção múltipla + indeterminate
3. **Radio** - Seleção única com grupo
4. **Switch** - Toggle binário com animação

**Todos com:**
- ✅ WCAG AA
- ✅ Estados completos
- ✅ Validação
- ✅ Acessibilidade
- ✅ Design System Portal Empresa

**Pronto para produção!** 🚀
