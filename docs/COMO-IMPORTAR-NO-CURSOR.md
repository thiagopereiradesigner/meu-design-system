# Como Importar os Componentes no Cursor

## 🎯 Entendendo os Arquivos

Você recebeu **2 versões** de cada componente:

### 1. **JSX (React)** - Para projetos React
- `ButtonComponent.jsx`
- `InputSelectComponents.jsx`
- Usa React, hooks, componentes
- Para: Next.js, Create React App, Vite, etc.

### 2. **HTML/CSS** - Para referência visual
- `button-demo.html`
- `input-select-demo.html`
- HTML puro + CSS + JavaScript vanilla
- Para: Ver funcionando, entender o design, copiar estilos

---

## 📦 Qual Usar no Projeto Real?

### Se seu projeto é React/Next.js → Use os `.jsx`
### Se seu projeto é HTML/CSS/JS → Adapte do `.html`

**99% das vezes você vai usar o JSX** porque é a forma moderna de trabalhar com componentes.

---

## 🚀 Passo a Passo - Importar no Cursor

### Cenário 1: Projeto React já existe

#### 1️⃣ Copie os arquivos JSX para seu projeto

```bash
# Estrutura sugerida
seu-projeto/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.jsx          # ← Cole aqui o ButtonComponent.jsx
│   │   │   └── icons.jsx           # ← Separe os ícones (opcional)
│   │   ├── Input/
│   │   │   └── Input.jsx           # ← Cole aqui o Input do InputSelectComponents.jsx
│   │   └── Select/
│   │       └── Select.jsx          # ← Cole aqui o Select do InputSelectComponents.jsx
│   └── tokens/
│       └── designTokens.js         # ← Cole os tokens (colors, spacing, etc)
```

#### 2️⃣ Separe os tokens em um arquivo próprio

**Crie: `src/tokens/designTokens.js`**

```javascript
export const tokens = {
  colors: {
    primary: {
      50: '#E6F4ED',
      100: '#CCE9DB',
      // ... resto das cores
    },
    // ... resto dos tokens
  },
  spacing: {
    xxs: '4px',
    xs: '8px',
    // ...
  }
  // ... resto
};
```

#### 3️⃣ Importe e use

**Em qualquer arquivo do seu projeto:**

```jsx
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Select } from './components/Select/Select';

function MeuFormulario() {
  return (
    <div>
      <Input 
        label="Nome"
        placeholder="Digite seu nome"
      />
      
      <Button variant="primary" size="large">
        Enviar
      </Button>
    </div>
  );
}
```

---

### Cenário 2: Projeto novo (não existe ainda)

#### Opção A: Pedir pro Cursor criar tudo

**Cole no Cursor:**

```
Crie um projeto React com Vite.

Depois, importe estes componentes que já tenho prontos:
[Cole aqui o conteúdo do ButtonComponent.jsx]
[Cole aqui o conteúdo do InputSelectComponents.jsx]

Organize assim:
- src/components/Button/Button.jsx
- src/components/Input/Input.jsx
- src/components/Select/Select.jsx
- src/tokens/designTokens.js

E crie uma página de exemplo usando todos os componentes.
```

O Cursor vai:
1. Criar o projeto
2. Organizar os arquivos
3. Separar tokens
4. Criar página de exemplo

---

#### Opção B: Fazer manual

```bash
# 1. Criar projeto
npm create vite@latest meu-projeto -- --template react
cd meu-projeto
npm install

# 2. Copiar componentes (você faz manual)
# 3. Rodar
npm run dev
```

---

## 🎨 Como o Cursor/Claude vai Entender

### ✅ Forma 1: Colar o código completo

**Você:**
```
Tenho estes componentes prontos. Organize no projeto:

[Cola o ButtonComponent.jsx completo]
```

**Claude:**
```
✓ Vou separar em:
  - src/components/Button/Button.jsx
  - src/components/Button/icons.jsx
  - src/tokens/designTokens.js

✓ Já organizei e atualizei os imports!
```

---

### ✅ Forma 2: Só avisar que tem

**Você:**
```
Tenho componentes prontos de Button, Input e Select no design system.
Crie uma página de cadastro usando eles.
```

**Claude:**
```jsx
// Claude vai IMPORTAR e USAR seus componentes
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

function Cadastro() {
  return (
    <form>
      <Input label="Nome" placeholder="Digite seu nome" />
      <Input label="Email" type="email" />
      <Button variant="primary">Cadastrar</Button>
    </form>
  );
}
```

---

### ✅ Forma 3: Integrar com biblioteca existente

**Você:**
```
Já tenho Shadcn/UI no projeto, mas quero usar meus componentes 
personalizados de Button e Input. Como integro?
```

**Claude:**
```
Posso fazer de 2 formas:

1. SUBSTITUIR Shadcn components pelos seus
   - Renomear para evitar conflito
   - import { Button as MyButton } from './Button'

2. USAR JUNTO
   - Shadcn para componentes complexos (Dialog, Dropdown)
   - Seus componentes para formulários
```

---

## 📁 Estrutura Recomendada (Final)

```
seu-projeto/
├── src/
│   ├── components/
│   │   ├── ui/                    # ← Design System
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.stories.jsx  (se usar Storybook)
│   │   │   │   └── index.js       # export { Button }
│   │   │   ├── Input/
│   │   │   │   ├── Input.jsx
│   │   │   │   └── index.js
│   │   │   └── Select/
│   │   │       ├── Select.jsx
│   │   │       └── index.js
│   │   └── icons/                 # ← Ícones separados
│   │       ├── SearchIcon.jsx
│   │       ├── InfoIcon.jsx
│   │       └── index.js
│   ├── tokens/
│   │   └── designTokens.js        # ← Cores, espaçamentos, etc
│   ├── pages/
│   │   └── Cadastro.jsx           # ← Usa os componentes
│   └── App.jsx
```

---

## 🔧 Configurar Imports Absolutos (Opcional mas recomendado)

### Vite (vite.config.js)
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/tokens': path.resolve(__dirname, './src/tokens')
    }
  }
});
```

### Next.js (jsconfig.json ou tsconfig.json)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/tokens/*": ["./src/tokens/*"]
    }
  }
}
```

**Agora você importa assim:**
```jsx
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { tokens } from '@/tokens/designTokens';
```

---

## 🤖 Conversa Típica com Cursor

### Exemplo 1: Primeira vez

**Você:**
```
Cole no chat do Cursor os arquivos:
- ButtonComponent.jsx
- InputSelectComponents.jsx

E diga:
"Organize estes componentes no projeto. Separe tokens, ícones e 
componentes. Crie uma página de exemplo."
```

**Claude faz:**
1. ✓ Cria estrutura de pastas
2. ✓ Separa tokens em arquivo próprio
3. ✓ Separa ícones
4. ✓ Atualiza imports
5. ✓ Cria página de exemplo
6. ✓ Testa tudo

---

### Exemplo 2: Adicionar ao projeto existente

**Você:**
```
Tenho um projeto Next.js. Cole aqui meus componentes de Button, 
Input e Select [cola os JSX]. Integra na pasta src/components/ui 
e cria um formulário de contato usando eles.
```

**Claude:**
```
✓ Criei src/components/ui/Button/Button.jsx
✓ Criei src/components/ui/Input/Input.jsx
✓ Criei src/components/ui/Select/Select.jsx
✓ Separei tokens em src/tokens/designTokens.js
✓ Criei src/app/contato/page.jsx usando os componentes

Pode testar em http://localhost:3000/contato
```

---

### Exemplo 3: Usar em formulário específico

**Você:**
```
Crie um formulário de cadastro de cliente com:
- Nome completo (obrigatório)
- Email (obrigatório)
- Telefone (opcional)
- Estado (select com busca)
- Cidade (depende do estado)

Use os componentes Input e Select que já temos.
```

**Claude gera o formulário completo usando seus componentes!**

---

## 📝 Resumo Executivo

### Para Cursor/Claude entender seus componentes:

1. **Cole o código JSX no chat** ✅
2. **Diga onde quer organizar** ✅
3. **Peça para criar algo usando eles** ✅

### Estrutura final:
```
src/
  components/ui/
    Button/
    Input/
    Select/
  tokens/
    designTokens.js
```

### Importar e usar:
```jsx
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

<Input label="Nome" />
<Button variant="primary">Enviar</Button>
```

---

## 🎯 Próximos Passos

1. ✅ Cole os JSX no Cursor
2. ✅ Peça pra organizar
3. ✅ Use normalmente nos formulários

**Não precisa entender tudo do código!** O Claude/Cursor vai gerenciar isso pra você.

---

## ❓ FAQ

**P: E o HTML? Não uso?**  
R: HTML é só pra você VER funcionando. No projeto real, use JSX.

**P: Preciso mexer no código dos componentes?**  
R: Não! Use como está. Se precisar customizar, o Claude ajuda.

**P: E se meu projeto usa TypeScript?**  
R: Cole o JSX e peça: "Converta para TypeScript". Claude faz na hora.

**P: Posso usar com Tailwind?**  
R: Sim! Os tokens já estão separados. Peça: "Adapte os componentes pra usar Tailwind CSS".

**P: E se já uso outra lib (MUI, Ant Design)?**  
R: Pode usar junto! Seus componentes funcionam independente.
