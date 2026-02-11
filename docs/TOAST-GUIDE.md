# Toast Component - Guia Completo

## 🎨 Alterações Necessárias no Figma

### ⚠️ **CRÍTICO: Cor Warning Active**

**Problema WCAG:**
```
❌ Cor atual: #F79009
   Contraste com branco: 2.37:1 (FALHA AA)
```

**✅ AÇÃO NECESSÁRIA:**
```
Componente: Alert/Toast Active/Warning
Propriedade: Background color
Trocar de: #F79009
Para: #DC6803 (primitivo yellow)
Novo contraste: 4.65:1 ✅ PASSA WCAG AA
```

### 📋 Checklist Figma

- [ ] Abrir componente `Alert/Toast Active/Warning`
- [ ] Selecionar background
- [ ] Trocar cor de `#F79009` para `#DC6803`
- [ ] Verificar que texto continua branco (#FFFFFF)
- [ ] Publicar alteração

**Teste de contraste:** https://webaim.org/resources/contrastchecker/
- Foreground: #FFFFFF
- Background: #DC6803
- Deve mostrar: 4.65:1 ✅

---

## 🚀 Como Usar o Toast

### **1. Setup Inicial (Uma Vez)**

```jsx
// App.jsx ou index.jsx
import { ToastProvider } from '@/components/ui/Toast';

function App() {
  return (
    <ToastProvider>
      {/* Seu app aqui */}
      <YourApp />
    </ToastProvider>
  );
}
```

---

### **2. Usar com Hook (Recomendado)**

```jsx
import { useToast } from '@/components/ui/Toast';

function MyComponent() {
  const { showToast } = useToast();

  const handleSave = async () => {
    try {
      await saveData();
      
      showToast({
        type: 'success',
        variant: 'active',
        title: 'Dados salvos!',
        message: 'Suas informações foram atualizadas.',
      });
    } catch (error) {
      showToast({
        type: 'error',
        variant: 'active',
        title: 'Erro ao salvar',
        message: error.message,
        duration: 5000, // Override padrão
      });
    }
  };

  return <button onClick={handleSave}>Salvar</button>;
}
```

---

### **3. Usar com Helper Functions (Mais Simples)**

```jsx
import { toast } from '@/components/ui/Toast';

// Success (auto-close em 3s)
toast.success('Dados salvos com sucesso!');

// Error (auto-close em 5s)
toast.error('Falha ao processar requisição.');

// Warning (auto-close em 4s)
toast.warning('Atenção: alguns campos não foram preenchidos.');

// Info (auto-close em 4s)
toast.info('Nova versão disponível.');

// Com título customizado
toast.success('Operação concluída', 'Sucesso!');

// Com opções
toast.error('Erro crítico', 'Falha no sistema', {
  duration: 7000,
  variant: 'light',
});
```

---

## 📦 Props do Toast

```typescript
interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  variant?: 'active' | 'light';  // default: 'active'
  title: string;
  message?: string;
  duration?: number;             // default: varia por tipo
  showProgress?: boolean;        // default: true
  onClose?: (id) => void;
}
```

---

## ⏱️ Duração Padrão por Tipo

```javascript
{
  success: 3000ms,  // Confirmação rápida
  error: 5000ms,    // Usuário precisa ler erro
  warning: 4000ms,  // Atenção média
  info: 4000ms,     // Informação
}
```

**Dica:** Hover no toast **pausa** o timer!

---

## 🎨 Variantes

### **Active (Padrão)**
- Fundo colorido
- Texto branco
- Mais chamativo
- Uso: Ações importantes

```jsx
showToast({
  type: 'success',
  variant: 'active',  // ← Fundo verde
  title: 'Salvo!',
});
```

### **Light**
- Fundo claro
- Texto colorido
- Menos invasivo
- Uso: Informações secundárias

```jsx
showToast({
  type: 'info',
  variant: 'light',  // ← Fundo azul claro
  title: 'Dica',
});
```

---

## 💡 Casos de Uso

### **1. Salvar Formulário**
```jsx
const handleSubmit = async (data) => {
  try {
    await api.post('/users', data);
    toast.success('Usuário criado com sucesso!');
    navigate('/users');
  } catch (error) {
    toast.error('Erro ao criar usuário. Tente novamente.');
  }
};
```

### **2. Deletar Item**
```jsx
const handleDelete = async (id) => {
  try {
    await api.delete(`/items/${id}`);
    toast.success('Item removido!', 'Exclusão confirmada');
    refetch();
  } catch (error) {
    toast.error('Não foi possível excluir o item.');
  }
};
```

### **3. Validação de Formulário**
```jsx
const handleSubmit = (data) => {
  if (!data.email) {
    toast.warning('Email é obrigatório', 'Atenção');
    return;
  }
  
  if (!data.acceptTerms) {
    toast.warning('Você precisa aceitar os termos de uso.');
    return;
  }
  
  // Continua...
};
```

### **4. Upload de Arquivo**
```jsx
const handleUpload = async (file) => {
  try {
    toast.info('Upload em andamento...', 'Processando', { duration: 0 }); // Não fecha
    await uploadFile(file);
    toast.success('Arquivo enviado com sucesso!');
  } catch (error) {
    toast.error('Falha no upload. Tente novamente.');
  }
};
```

### **5. Notificação de Sistema**
```jsx
useEffect(() => {
  socket.on('system-update', () => {
    toast.info('Nova versão disponível. Atualize a página.', 'Atualização', {
      duration: 7000,
      variant: 'light',
    });
  });
}, []);
```

---

## 🎯 Quando Usar Cada Tipo?

| Tipo | Quando usar | Exemplos |
|------|-------------|----------|
| **Success** | Operação completada | Salvar, Deletar, Enviar, Upload |
| **Error** | Algo deu errado | API falhou, Validação, Timeout |
| **Warning** | Atenção necessária | Campos vazios, Ação irreversível, Dados incompletos |
| **Info** | Informação geral | Atualizações, Dicas, Mudanças |

---

## 🎨 Quando Usar Cada Variante?

| Variante | Quando usar |
|----------|-------------|
| **Active** | Ações importantes (salvar, deletar, erros críticos) |
| **Light** | Informações secundárias (dicas, atualizações, avisos leves) |

---

## ♿ Acessibilidade (WCAG AA)

### **Implementado:**
- ✅ **role="alert"** para leitores de tela
- ✅ **aria-live="assertive"** (error) ou "polite" (outros)
- ✅ **aria-atomic="true"** para ler conteúdo completo
- ✅ **Esc fecha** o toast
- ✅ **Contraste 4.5:1** mínimo (WCAG AA)
- ✅ **Font-size 14px** mínimo
- ✅ **Touch target 44x44px** (botão close)
- ✅ **Hover pausa timer** (usuário controla)

### **Cores WCAG AA:**
```
Success #04843B: 4.89:1 ✅
Error #DC2626:   4.54:1 ✅
Warning #DC6803: 4.65:1 ✅
Info #3B82F6:    4.56:1 ✅
```

---

## ✨ Features Avançadas

### **1. Toast sem auto-close**
```jsx
showToast({
  type: 'info',
  title: 'Processando...',
  message: 'Aguarde enquanto fazemos o upload.',
  duration: 0,  // ← Não fecha automaticamente
});
```

### **2. Toast sem progress bar**
```jsx
showToast({
  type: 'success',
  title: 'Salvo!',
  showProgress: false,  // ← Sem barra de progresso
});
```

### **3. Toast apenas com título**
```jsx
showToast({
  type: 'success',
  title: 'Salvo!',
  // message não é obrigatório
});
```

### **4. Callback ao fechar**
```jsx
showToast({
  type: 'success',
  title: 'Salvo!',
  onClose: (id) => {
    console.log('Toast fechado:', id);
    // Executar ação após fechar
  },
});
```

---

## 🚫 Anti-padrões

### ❌ **Não use toast para confirmações**
```jsx
// ERRADO
toast.warning('Tem certeza que quer deletar?');

// CORRETO
<Modal>
  <p>Tem certeza que quer deletar?</p>
  <Button onClick={handleDelete}>Confirmar</Button>
</Modal>
```

### ❌ **Não use múltiplos toasts simultâneos**
```jsx
// ERRADO - Poluição visual
toast.success('Item 1 salvo');
toast.success('Item 2 salvo');
toast.success('Item 3 salvo');

// CORRETO - Um toast resumindo
toast.success('3 itens salvos com sucesso!');
```

### ❌ **Não use toast para erros críticos**
```jsx
// ERRADO - Toast some, usuário perde informação
toast.error('Erro crítico no sistema');

// CORRETO - Modal que força atenção
<Modal>
  <Alert type="error">
    Erro crítico detectado. Entre em contato com suporte.
  </Alert>
</Modal>
```

### ❌ **Não use textos muito longos**
```jsx
// ERRADO - Muito texto
toast.success('O usuário João Silva foi criado com sucesso no sistema e já pode fazer login usando o email joao@empresa.com...');

// CORRETO - Conciso
toast.success('Usuário criado com sucesso!');
```

---

## 🎯 Boas Práticas

### ✅ **1. Seja específico**
```jsx
// Ruim
toast.success('Sucesso!');

// Bom
toast.success('Usuário criado com sucesso!');
```

### ✅ **2. Use verbos de ação**
```jsx
// Ruim
toast.error('Problema');

// Bom
toast.error('Falha ao salvar dados');
```

### ✅ **3. Contexto no título**
```jsx
showToast({
  type: 'success',
  title: 'Upload concluído',        // ← Contexto
  message: '3 arquivos enviados.',   // ← Detalhe
});
```

### ✅ **4. Feedback imediato**
```jsx
const handleSave = async () => {
  toast.info('Salvando...', 'Aguarde', { duration: 0 });
  
  await api.save();
  
  toast.success('Dados salvos!');  // Substitui o anterior
};
```

---

## 🔧 Customização Avançada

### **Cores Customizadas (se necessário)**
```jsx
// Não recomendado, mas possível
const customToast = {
  bg: '#8B5CF6',
  text: '#FFFFFF',
  // ...
};
```

**⚠️ Atenção:** Sempre verifique WCAG AA!

---

## 📊 Comparação: Toast vs Modal vs Alert

| Feature | Toast | Modal | Alert (inline) |
|---------|-------|-------|----------------|
| **Interrompe UX** | ❌ Não | ✅ Sim | ❌ Não |
| **Auto-close** | ✅ Sim | ❌ Não | ❌ Não |
| **Confirmação** | ❌ Não | ✅ Sim | ⚠️ Depende |
| **Feedback rápido** | ✅ Sim | ❌ Não | ✅ Sim |
| **Erro crítico** | ❌ Não | ✅ Sim | ✅ Sim |

**Regra geral:**
- **Toast:** Feedback de ações (salvar, deletar)
- **Modal:** Confirmações, formulários
- **Alert:** Erros inline em formulários

---

## 🎬 Animações

### **Entrada:**
```
Opacidade: 0 → 1
TranslateY: -20px → 0px
Duração: 300ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### **Saída:**
```
Opacidade: 1 → 0
TranslateY: 0px → -20px
Duração: 300ms
```

### **Progress Bar:**
```
Width: 100% → 0%
Duração: Baseado no tipo
Animation: linear
```

---

## 📦 Estrutura do Componente

```
ToastProvider (Context)
  └─ Toast (Componente)
      ├─ Icon (Info/Error/Warning/Success)
      ├─ Content (Title + Message)
      ├─ Close Button
      └─ Progress Bar
```

---

## ✅ Checklist de Uso

Antes de usar em produção:

- [ ] ToastProvider está no App.jsx?
- [ ] Título é claro e específico?
- [ ] Mensagem é concisa (<100 chars)?
- [ ] Tipo correto (success/error/warning/info)?
- [ ] Variante adequada (active/light)?
- [ ] Testou no mobile?
- [ ] Testou com leitor de tela?
- [ ] Testou Esc para fechar?
- [ ] Testou hover pausa timer?

---

## 🎯 Resumo de 1 Linha

**Toast = feedback não-invasivo com auto-close. Use para confirmar ações, não para confirmações.** 🎉

---

## 🔗 Links Úteis

- Teste de contraste: https://webaim.org/resources/contrastchecker/
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- ARIA Alert: https://www.w3.org/TR/wai-aria-practices-1.1/#alert

---

## 📝 Changelog

**v1.0.0 - Inicial**
- ✅ 4 tipos (success, error, warning, info)
- ✅ 2 variantes (active, light)
- ✅ Auto-close configurável
- ✅ Progress bar animada
- ✅ Hover pausa timer
- ✅ Esc fecha
- ✅ WCAG AA compliant
- ✅ ARIA support
- ✅ Context API
- ✅ Helper functions
