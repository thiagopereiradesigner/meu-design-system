# Final Components - Guia Completo v2

## 📋 Componentes Incluídos

- **Spinner** - Indicador de carregamento
- **Tooltip** - Dica contextual (com arrow/setinha)
- **Menu** - Navegação lateral (sidebar)
- **Tabs** - Navegação por abas (underline e pill)
- **Drawer** - Painel lateral deslizante
- **Modal** - Janela sobreposta centralizada
- **Breadcrumb** - Navegação hierárquica

---

## 🎨 Design Tokens

```javascript
const tokens = {
  colors: {
    primary: {
      50: '#E6F4ED',
      500: '#04843B',
      700: '#005A1A',
    },
    neutral: {
      0: '#FFFFFF',
      100: '#F3F3F3',
      200: '#C6C6C6',
      800: '#1A1A1A',
    },
    content: {
      primary: '#393939',
      secondary: '#5E5E5E',
      inverse: '#FFFFFF',
    },
    border: {
      secondary: '#DDDDDD',
    },
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
  },
  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
  },
  shadows: {
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
  },
  zIndex: {
    tooltip: 9998,
    drawer: 9999,
    modal: 10000,
  },
};
```

---

# 1. Spinner

## 📦 Props

```typescript
interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';  // Default: 'medium'
  color?: string;                        // Default: primary[500]
}
```

---

## 🚀 Uso Básico

```jsx
import { Spinner } from '@/components/ui/FinalComponents';

function LoadingPage() {
  return (
    <div>
      <Spinner size="medium" />
      <p>Carregando...</p>
    </div>
  );
}
```

---

## 💡 Exemplos

### **Tamanhos:**
```jsx
// Small (16px)
<Spinner size="small" />

// Medium (24px) - Default
<Spinner size="medium" />

// Large (40px)
<Spinner size="large" />
```

### **Cor customizada:**
```jsx
<Spinner color="#DC2626" />
```

### **Loading em botão:**
```jsx
<button disabled>
  <Spinner size="small" color="white" />
  <span style={{ marginLeft: '8px' }}>Carregando...</span>
</button>
```

### **Full page loading:**
```jsx
function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <Spinner size="large" />
      <p>Aguarde, carregando...</p>
    </div>
  );
}
```

---

## 🎨 Tamanhos

| Tamanho | Dimensão | Uso |
|---------|----------|-----|
| **Small** | 16px | Botões, inputs, inline |
| **Medium** | 24px | Cards, sections |
| **Large** | 40px | Full page, overlays |

---

## ♿ Acessibilidade

- ✅ `role="status"`
- ✅ `aria-label="Carregando"`
- ✅ Texto visualmente oculto
- ✅ Animação suave (0.8s)

---

## 🎯 Casos de Uso

- Loading de página
- Botões com ação assíncrona
- Carregamento de dados
- Processos em andamento
- Upload de arquivos

---

# 2. Tooltip

## 📦 Props

```typescript
interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';  // Default: 'top'
  delay?: number;                                    // Default: 200ms
}
```

**✨ Novo: Tooltip agora inclui arrow/setinha automática em todas as posições!**

---

## 🚀 Uso Básico

```jsx
import { Tooltip } from '@/components/ui/FinalComponents';

function MyComponent() {
  return (
    <Tooltip content="Clique para salvar">
      <button>Salvar</button>
    </Tooltip>
  );
}
```

---

## 💡 Exemplos

### **Posições:**
```jsx
// Top (default)
<Tooltip content="Tooltip no topo" position="top">
  <button>Top</button>
</Tooltip>

// Right
<Tooltip content="Tooltip à direita" position="right">
  <button>Right</button>
</Tooltip>

// Bottom
<Tooltip content="Tooltip embaixo" position="bottom">
  <button>Bottom</button>
</Tooltip>

// Left
<Tooltip content="Tooltip à esquerda" position="left">
  <button>Left</button>
</Tooltip>
```

### **Delay customizado:**
```jsx
<Tooltip content="Aparece após 500ms" delay={500}>
  <span>Passe o mouse aqui</span>
</Tooltip>
```

### **Em ícone:**
```jsx
<Tooltip content="Configurações">
  <button>
    <SettingsIcon />
  </button>
</Tooltip>
```

### **Em texto:**
```jsx
<p>
  Este campo é 
  <Tooltip content="Informação adicional sobre o campo">
    <span style={{ textDecoration: 'underline', cursor: 'help' }}>
      obrigatório
    </span>
  </Tooltip>
</p>
```

---

## 🎨 Posições

| Posição | Quando usar |
|---------|-------------|
| **Top** | Default, menos invasivo |
| **Bottom** | Elementos no topo da tela |
| **Left** | Elementos na borda direita |
| **Right** | Elementos na borda esquerda |

---

## ♿ Acessibilidade

- ✅ `role="tooltip"`
- ✅ Delay para evitar poluição
- ✅ Não bloqueia interação
- ✅ Desaparece ao sair do hover

---

## 🎯 Casos de Uso

- Ícones sem label
- Informações adicionais
- Atalhos de teclado
- Ajuda contextual
- Campos de formulário

---

# 3. Menu (Sidebar)

## 📦 Props

```typescript
interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface MenuProps {
  items: MenuItem[];
  collapsed?: boolean;       // Default: false
  onItemClick?: (item: MenuItem) => void;
}
```

---

## 🚀 Uso Básico

```jsx
import { Menu } from '@/components/ui/FinalComponents';

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />
    },
    {
      id: 'users',
      label: 'Usuários',
      icon: <UsersIcon />
    },
  ];

  return (
    <Menu
      items={menuItems}
      collapsed={collapsed}
      onItemClick={(item) => console.log(item.id)}
    />
  );
}
```

---

## 💡 Exemplos

### **Menu expandido (default):**
```jsx
<Menu
  items={menuItems}
  collapsed={false}
  onItemClick={handleItemClick}
/>
```

### **Menu colapsado (só ícones):**
```jsx
<Menu
  items={menuItems}
  collapsed={true}
/>
```

### **Com navegação:**
```jsx
const navigate = useNavigate();

const handleItemClick = (item) => {
  navigate(`/${item.id}`);
};

<Menu
  items={menuItems}
  onItemClick={handleItemClick}
/>
```

### **Layout completo:**
```jsx
function AppLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Menu items={menuItems} />
      <main style={{ flex: 1, padding: '24px' }}>
        {/* Conteúdo principal */}
      </main>
    </div>
  );
}
```

---

## 🎨 Estados

| Estado | Largura | Conteúdo |
|--------|---------|----------|
| **Expandido** | 240px | Ícone + Label |
| **Colapsado** | 60px | Só ícone |
| **Active** | - | Fundo verde + borda |
| **Hover** | - | Fundo cinza claro |

---

## ♿ Acessibilidade

- ✅ `<nav>` semântico
- ✅ Keyboard navegável (Tab)
- ✅ Active state claro
- ✅ Ícones com alt text

---

## 🎯 Casos de Uso

- Navegação principal
- Admin dashboards
- Aplicações complexas
- Sidebar fixa
- Menu lateral colapsável

---

# 4. Tabs

## 📦 Props

```typescript
interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'filled';  // Default: 'underline'
}
```

---

## 🚀 Uso Básico

```jsx
import { Tabs } from '@/components/ui/FinalComponents';

function MyComponent() {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs = [
    { id: 'tab1', label: 'Visão Geral' },
    { id: 'tab2', label: 'Detalhes' },
    { id: 'tab3', label: 'Configurações' },
  ];

  return (
    <>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <div>
        {activeTab === 'tab1' && <Overview />}
        {activeTab === 'tab2' && <Details />}
        {activeTab === 'tab3' && <Settings />}
      </div>
    </>
  );
}
```

---

## 💡 Exemplos

### **Underline (default):**
```jsx
<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="underline"
/>
```

### **Filled:**
```jsx
<Tabs
  tabs={tabs}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="filled"
/>
```

### **Com conteúdo dinâmico:**
```jsx
function TabsExample() {
  const [activeTab, setActiveTab] = useState('profile');

  const content = {
    profile: <ProfileForm />,
    security: <SecuritySettings />,
    billing: <BillingInfo />,
  };

  return (
    <>
      <Tabs
        tabs={[
          { id: 'profile', label: 'Perfil' },
          { id: 'security', label: 'Segurança' },
          { id: 'billing', label: 'Cobrança' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <div style={{ padding: '24px' }}>
        {content[activeTab]}
      </div>
    </>
  );
}
```

### **Controlado externamente:**
```jsx
// URL-based tabs
const params = useParams();

<Tabs
  tabs={tabs}
  activeTab={params.tab}
  onChange={(tabId) => navigate(`/settings/${tabId}`)}
/>
```

---

## 🎨 Variantes

| Variante | Aparência | Quando usar |
|----------|-----------|-------------|
| **Underline** | Borda inferior | Default, mais clean |
| **Filled** | Pill arredondado (verde claro) | Mais destaque, estilo moderno |

**✨ Novo: Filled agora usa estilo pill (border-radius: 100px) com fundo verde claro (#E6F4ED) ao invés de verde sólido!**

---

## ♿ Acessibilidade

- ✅ `role="tablist"`
- ✅ `role="tab"` em cada aba
- ✅ `aria-selected` no ativo
- ✅ Keyboard navegável (Arrow keys)

---

## 🎯 Casos de Uso

- Navegação entre seções
- Configurações de perfil
- Dashboards multi-view
- Detalhes de produto
- Formulários multi-step

---

# 5. Drawer

## 📦 Props

```typescript
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  position?: 'left' | 'right';  // Default: 'right'
  width?: string;                // Default: '400px'
}
```

---

## 🚀 Uso Básico

```jsx
import { Drawer } from '@/components/ui/FinalComponents';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Abrir Drawer
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Configurações"
      >
        <p>Conteúdo do drawer</p>
      </Drawer>
    </>
  );
}
```

---

## 💡 Exemplos

### **Drawer à direita (default):**
```jsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Filtros"
  position="right"
>
  <FilterForm />
</Drawer>
```

### **Drawer à esquerda:**
```jsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Menu"
  position="left"
>
  <Navigation />
</Drawer>
```

### **Drawer largo:**
```jsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Detalhes"
  width="600px"
>
  <DetailedView />
</Drawer>
```

### **Drawer com formulário:**
```jsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Novo Usuário"
>
  <form onSubmit={handleSubmit}>
    <Input label="Nome" />
    <Input label="Email" />
    <Button type="submit">Salvar</Button>
  </form>
</Drawer>
```

### **Drawer com confirmação:**
```jsx
function EditDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleClose = () => {
    if (hasChanges) {
      if (confirm('Descartar alterações?')) {
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={handleClose} title="Editar">
      {/* Conteúdo */}
    </Drawer>
  );
}
```

---

## 🎨 Animações

- **Slide-in:** Desliza da borda (300ms)
- **Overlay:** Fade in (300ms)
- **Slide-out:** Desliza para fora (300ms)

---

## ♿ Acessibilidade

- ✅ `role="dialog"`
- ✅ `aria-modal="true"`
- ✅ Esc fecha o drawer
- ✅ Click fora fecha
- ✅ Focus trap (mantém foco dentro)
- ✅ `overflow: hidden` no body

---

## 🎯 Casos de Uso

- Filtros de busca
- Formulários laterais
- Detalhes de item
- Configurações
- Edição rápida
- Navegação mobile

---

# 6. Modal

## 📦 Props

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'small' | 'medium' | 'large';  // Default: 'medium'
  showCloseButton?: boolean;             // Default: true
}
```

---

## 🚀 Uso Básico

```jsx
import { Modal } from '@/components/ui/FinalComponents';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Abrir Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirmar Ação"
      >
        <p>Tem certeza que deseja continuar?</p>
        <button onClick={() => setIsOpen(false)}>
          Confirmar
        </button>
      </Modal>
    </>
  );
}
```

---

## 💡 Exemplos

### **Tamanhos:**
```jsx
// Small (400px)
<Modal isOpen={isOpen} onClose={onClose} size="small">
  <p>Modal pequeno</p>
</Modal>

// Medium (600px) - Default
<Modal isOpen={isOpen} onClose={onClose} size="medium">
  <p>Modal médio</p>
</Modal>

// Large (800px)
<Modal isOpen={isOpen} onClose={onClose} size="large">
  <p>Modal grande</p>
</Modal>
```

### **Confirmação:**
```jsx
function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    // Deletar
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Confirmar Exclusão"
      size="small"
    >
      <p>Esta ação não pode ser desfeita.</p>
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <Button variant="danger" onClick={handleDelete}>
          Excluir
        </Button>
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
```

### **Formulário:**
```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Novo Item"
>
  <form onSubmit={handleSubmit}>
    <Input label="Nome" required />
    <Textarea label="Descrição" />
    <Button type="submit">Criar</Button>
  </form>
</Modal>
```

### **Sem botão fechar:**
```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Processando..."
  showCloseButton={false}
>
  <Spinner />
  <p>Aguarde, processando dados...</p>
</Modal>
```

### **Modal de sucesso:**
```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Sucesso!"
  size="small"
>
  <div style={{ textAlign: 'center' }}>
    <CheckCircleIcon size={48} color="green" />
    <p>Operação concluída com sucesso!</p>
    <Button onClick={() => setIsOpen(false)}>
      OK
    </Button>
  </div>
</Modal>
```

---

## 🎨 Tamanhos

| Tamanho | Largura | Uso |
|---------|---------|-----|
| **Small** | 400px | Confirmações, alertas |
| **Medium** | 600px | Formulários, detalhes |
| **Large** | 800px | Conteúdo complexo |

---

## 🎨 Animações

- **Fade overlay:** Opacity 0→1 (300ms)
- **Scale modal:** Scale 0.95→1 (300ms)
- **Fade out:** Reverse (300ms)

---

## ♿ Acessibilidade

- ✅ `role="dialog"`
- ✅ `aria-modal="true"`
- ✅ `aria-labelledby` para título
- ✅ Esc fecha o modal
- ✅ Click overlay fecha
- ✅ Focus trap
- ✅ `overflow: hidden` no body
- ✅ Retorna foco ao elemento que abriu

---

## 🎯 Casos de Uso

- Confirmações
- Formulários de criação/edição
- Detalhes de item
- Alertas importantes
- Wizards/multi-step
- Visualização de mídia

---

# 7. Breadcrumb

## 📦 Props

```typescript
interface BreadcrumbItem {
  id?: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;  // Default: '/'
}
```

---

## 🚀 Uso Básico

```jsx
import { Breadcrumb } from '@/components/ui/FinalComponents';

function ProductPage() {
  return (
    <Breadcrumb
      items={[
        { id: 'home', label: 'Home', href: '/' },
        { id: 'products', label: 'Produtos', href: '/products' },
        { id: 'electronics', label: 'Eletrônicos', href: '/products/electronics' },
        { id: 'current', label: 'Notebook Dell' },
      ]}
    />
  );
}
```

---

## 💡 Exemplos

### **Básico:**
```jsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Produtos', href: '/products' },
    { label: 'Notebook' },  // ← Página atual (sem href)
  ]}
/>
```

### **Com onClick (para SPAs):**
```jsx
const navigate = useNavigate();

<Breadcrumb
  items={[
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Produtos', onClick: () => navigate('/products') },
    { label: 'Eletrônicos', onClick: () => navigate('/products/electronics') },
    { label: 'Notebook Dell' },
  ]}
/>
```

### **Separador customizado:**
```jsx
// Com seta
<Breadcrumb
  separator=">"
  items={items}
/>

// Com ponto
<Breadcrumb
  separator="•"
  items={items}
/>

// Com emoji
<Breadcrumb
  separator="→"
  items={items}
/>
```

### **Com IDs:**
```jsx
<Breadcrumb
  items={[
    { id: 'home', label: 'Início', href: '/' },
    { id: 'config', label: 'Configurações', href: '/config' },
    { id: 'profile', label: 'Perfil' },
  ]}
/>
```

### **Navegação profunda:**
```jsx
<Breadcrumb
  items={[
    { label: 'Portal', href: '/' },
    { label: 'Admin', href: '/admin' },
    { label: 'Usuários', href: '/admin/users' },
    { label: 'Grupos', href: '/admin/users/groups' },
    { label: 'Permissões', href: '/admin/users/groups/permissions' },
    { label: 'Editar' },
  ]}
/>
```

---

## 🎨 Estados Visuais

| Elemento | Cor | Peso | Cursor |
|----------|-----|------|--------|
| **Link** | `#5E5E5E` | Regular | Pointer |
| **Link Hover** | `#04843B` | Regular | Pointer |
| **Current** | `#393939` | Semibold | Default |
| **Separator** | `#727272` | Regular | Default |

---

## ♿ Acessibilidade

- ✅ `<nav>` semântico
- ✅ `aria-label="Breadcrumb"`
- ✅ `aria-current="page"` no último item
- ✅ Links navegáveis por teclado
- ✅ Hover states claros
- ✅ Contraste WCAG AA

---

## 🎯 Casos de Uso

- Navegação hierárquica
- E-commerce (Categoria > Subcategoria > Produto)
- Admin panels
- Documentação
- Aplicações multi-nível
- Orientação do usuário

---

## 🎨 Quando Usar

**✅ Use Breadcrumb quando:**
- Site tem 3+ níveis de hierarquia
- Usuário precisa voltar facilmente
- Estrutura é clara e linear
- E-commerce com categorias
- Admin com seções aninhadas

**❌ Não use quando:**
- Site tem 1-2 níveis apenas
- Navegação não é linear
- App mobile (use botão voltar)
- Estrutura é muito complexa

---

## 💡 Boas Práticas

### **1. Último item sem link:**
```jsx
// BOM - Último item é texto, não link
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Página Atual' },  // ← Sem href
  ]}
/>

// RUIM - Último item é link
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Página Atual', href: '/current' },  // ← Não faça isso
  ]}
/>
```

### **2. Labels curtos e claros:**
```jsx
// BOM
{ label: 'Produtos' }

// RUIM - Muito longo
{ label: 'Todos os Produtos Disponíveis em Estoque' }
```

### **3. Separador consistente:**
```jsx
// BOM - Use o mesmo separador em todo o site
<Breadcrumb separator="/" items={items} />

// RUIM - Separadores diferentes
<Breadcrumb separator=">" items={items1} />
<Breadcrumb separator="/" items={items2} />  // ← Inconsistente
```

### **4. Máximo 5-7 níveis:**
```jsx
// BOM - Profundidade razoável
Home / Produtos / Eletrônicos / Notebooks / Dell / Inspiron

// RUIM - Muito profundo
Home / Admin / Config / Users / Groups / Permissions / Edit / Details / Advanced
// ← Considere simplificar a estrutura
```

---

## 🚫 Anti-padrões

### **❌ Não use breadcrumb para fluxos:**
```jsx
// ERRADO - Isso é um stepper, não breadcrumb
<Breadcrumb
  items={[
    { label: 'Carrinho' },
    { label: 'Endereço' },
    { label: 'Pagamento' },
    { label: 'Confirmação' },
  ]}
/>

// CORRETO - Use um componente Stepper
<Stepper steps={checkoutSteps} />
```

### **❌ Não use em mobile (geralmente):**
```jsx
// ERRADO - Breadcrumb em telas pequenas
@media (max-width: 768px) {
  .breadcrumb { display: block; }  // ← Ocupa muito espaço
}

// CORRETO - Esconda ou use botão voltar
@media (max-width: 768px) {
  .breadcrumb { display: none; }
}
```

### **❌ Não repita a navegação:**
```jsx
// ERRADO - Breadcrumb + Menu com mesma info
<Menu items={menuItems} />
<Breadcrumb items={breadcrumbItems} />  // ← Redundante

// CORRETO - Use um ou outro
<Breadcrumb items={breadcrumbItems} />
```

---

## 🎨 Comparação: Breadcrumb vs Menu vs Tabs

| Feature | Breadcrumb | Menu | Tabs |
|---------|------------|------|------|
| **Propósito** | Hierarquia/Localização | Navegação principal | Organizar conteúdo |
| **Níveis** | Multi-nível | Flat ou 1 nível | Flat |
| **Uso** | "Onde estou?" | "Para onde ir?" | "O que ver?" |
| **Posição** | Topo da página | Lateral/Topo | Acima do conteúdo |

---

## 📱 Responsividade

### **Desktop:**
```jsx
// Mostra tudo
Home / Produtos / Eletrônicos / Notebooks / Dell / Inspiron 15
```

### **Tablet:**
```jsx
// Trunca no meio
Home / ... / Notebooks / Dell / Inspiron 15
```

### **Mobile:**
```jsx
// Esconde ou usa botão voltar
< Voltar
```

**Exemplo:**
```jsx
function ResponsiveBreadcrumb({ items }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (isMobile) {
    return (
      <button onClick={() => history.back()}>
        ← Voltar
      </button>
    );
  }
  
  return <Breadcrumb items={items} />;
}
```

---

## 🧪 Testing

```jsx
// Breadcrumb
const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
expect(breadcrumb).toBeInTheDocument();

// Links clicáveis
const homeLink = screen.getByText('Home');
fireEvent.click(homeLink);
expect(mockNavigate).toHaveBeenCalledWith('/');

// Último item (current)
const current = screen.getByText('Página Atual');
expect(current).toHaveAttribute('aria-current', 'page');
expect(current).not.toHaveAttribute('href');

// Separadores
const separators = screen.getAllByText('/');
expect(separators).toHaveLength(2); // 3 items = 2 separadores
```

---

# 🎨 Comparação: Drawer vs Modal

| Feature | Drawer | Modal |
|---------|--------|-------|
| **Posição** | Lateral (left/right) | Centro |
| **Animação** | Slide | Scale + Fade |
| **Uso** | Filtros, edição, nav | Confirmações, forms |
| **Tamanho** | Fixo (width) | Responsivo (small/medium/large) |
| **Quando** | Ação secundária | Ação primária/crítica |
| **Fecha ao clicar fora** | ✅ Sim | ✅ Sim |
| **Esc fecha** | ✅ Sim | ✅ Sim |

---

# 🚫 Anti-padrões

## ❌ Não use Spinner sem contexto:
```jsx
// ERRADO
<Spinner />

// CORRETO
<div>
  <Spinner />
  <p>Carregando dados...</p>
</div>
```

## ❌ Não use Tooltip para informações críticas:
```jsx
// ERRADO - Usuário pode não ver
<Tooltip content="Este campo é obrigatório">
  <Input />
</Tooltip>

// CORRETO
<Input
  label="Nome"
  required
  helperText="Campo obrigatório"
/>
```

## ❌ Não use Menu sem ícones quando colapsado:
```jsx
// ERRADO - Sem contexto visual
items={[
  { id: 'home', label: 'Home' } // Sem ícone
]}

// CORRETO
items={[
  { id: 'home', label: 'Home', icon: <HomeIcon /> }
]}
```

## ❌ Não use Tabs para muitas opções:
```jsx
// ERRADO - Muitas abas
<Tabs tabs={[
  { id: '1', label: 'Aba 1' },
  { id: '2', label: 'Aba 2' },
  // ... 10+ tabs
]} />

// CORRETO - Use Select ou Menu
<Select options={tabOptions} />
```

## ❌ Não use Drawer para ações críticas:
```jsx
// ERRADO - Confirmação em drawer
<Drawer title="Deletar?">
  <p>Confirmar exclusão?</p>
</Drawer>

// CORRETO - Use Modal
<Modal title="Confirmar Exclusão">
  <p>Esta ação não pode ser desfeita.</p>
</Modal>
```

## ❌ Não use Modal para tudo:
```jsx
// ERRADO - Filtros em modal
<Modal title="Filtros">
  <FilterForm />
</Modal>

// CORRETO - Use Drawer
<Drawer title="Filtros">
  <FilterForm />
</Drawer>
```

---

# ✅ Boas Práticas

## **1. Spinner sempre com contexto:**
```jsx
// Bom
<div style={{ textAlign: 'center' }}>
  <Spinner />
  <p>Processando pagamento...</p>
</div>
```

## **2. Tooltip para informações complementares:**
```jsx
// Bom
<Tooltip content="Atalho: Ctrl+S">
  <button>Salvar</button>
</Tooltip>
```

## **3. Menu com hierarquia clara:**
```jsx
// Bom - Ícones consistentes, labels claros
const menuItems = [
  { id: 'dash', label: 'Dashboard', icon: <DashIcon /> },
  { id: 'users', label: 'Usuários', icon: <UsersIcon /> },
  { id: 'settings', label: 'Configurações', icon: <SettingsIcon /> },
];
```

## **4. Tabs para navegação horizontal:**
```jsx
// Bom - 3-5 tabs no máximo
<Tabs tabs={[
  { id: 'overview', label: 'Visão Geral' },
  { id: 'details', label: 'Detalhes' },
  { id: 'settings', label: 'Configurações' },
]} />
```

## **5. Drawer para ações secundárias:**
```jsx
// Bom - Filtros, edição rápida
<Drawer title="Filtrar Resultados">
  <FilterForm />
</Drawer>
```

## **6. Modal para ações críticas:**
```jsx
// Bom - Confirmações importantes
<Modal title="Deletar Conta" size="small">
  <p>Esta ação é irreversível!</p>
  <Button variant="danger">Confirmar</Button>
</Modal>
```

---

# 🎯 Quando Usar Cada Um?

## **Use Spinner quando:**
- ✅ Carregando dados
- ✅ Processando ação
- ✅ Upload/download
- ✅ Aguardando resposta

## **Use Tooltip quando:**
- ✅ Explicar ícone
- ✅ Mostrar atalho
- ✅ Info adicional
- ✅ Ajuda contextual

## **Use Menu quando:**
- ✅ Navegação principal
- ✅ Sidebar de app
- ✅ Menu lateral
- ✅ 5+ itens de nav

## **Use Tabs quando:**
- ✅ Organizar conteúdo relacionado
- ✅ 2-5 seções
- ✅ Navegação horizontal
- ✅ Conteúdo na mesma página

## **Use Drawer quando:**
- ✅ Filtros
- ✅ Formulários laterais
- ✅ Edição rápida
- ✅ Detalhes extras
- ✅ Ação secundária

## **Use Modal quando:**
- ✅ Confirmações
- ✅ Ações críticas
- ✅ Formulários importantes
- ✅ Alertas
- ✅ Ação primária

---

# ♿ Checklist de Acessibilidade

## **Spinner:**
- [ ] `role="status"` presente
- [ ] Texto alternativo
- [ ] Contexto visual claro

## **Tooltip:**
- [ ] `role="tooltip"` presente
- [ ] Não bloqueia interação
- [ ] Delay adequado (200ms+)

## **Menu:**
- [ ] `<nav>` semântico
- [ ] Keyboard navegável
- [ ] Active state claro
- [ ] Ícones descritivos

## **Tabs:**
- [ ] `role="tablist"` no container
- [ ] `role="tab"` em cada aba
- [ ] `aria-selected` no ativo
- [ ] Arrow keys funcionam

## **Drawer:**
- [ ] `role="dialog"` presente
- [ ] `aria-modal="true"`
- [ ] Esc fecha
- [ ] Focus trap ativo
- [ ] Click fora fecha

## **Modal:**
- [ ] `role="dialog"` presente
- [ ] `aria-modal="true"`
- [ ] `aria-labelledby` para título
- [ ] Esc fecha
- [ ] Focus trap ativo
- [ ] Retorna foco ao abrir

---

# 🎨 Exemplos Completos

## **Dashboard com Menu e Tabs:**
```jsx
function Dashboard() {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Menu
        items={menuItems}
        collapsed={menuCollapsed}
        onItemClick={(item) => console.log(item)}
      />
      
      <main style={{ flex: 1, padding: '24px' }}>
        <Tabs
          tabs={[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'reports', label: 'Relatórios' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        
        <div style={{ marginTop: '24px' }}>
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'reports' && <Reports />}
        </div>
      </main>
    </div>
  );
}
```

## **Lista com Filtro (Drawer) e Ações (Modal):**
```jsx
function ProductList() {
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div>
        <button onClick={() => setShowFilters(true)}>
          Filtros
        </button>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spinner size="large" />
            <p>Carregando produtos...</p>
          </div>
        ) : (
          <table>
            {/* Lista de produtos */}
          </table>
        )}
      </div>

      <Drawer
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filtrar Produtos"
      >
        <FilterForm />
      </Drawer>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmar Exclusão"
        size="small"
      >
        <p>Deseja excluir este produto?</p>
        <Button onClick={handleDelete}>Confirmar</Button>
      </Modal>
    </>
  );
}
```

---

# 📦 Estrutura de Arquivos

```
src/
├── components/
│   └── ui/
│       ├── FinalComponents.jsx
│       ├── FormComponents.jsx
│       ├── Button.jsx
│       └── ...
```

## **Import:**
```jsx
import { 
  Spinner,
  Tooltip,
  Menu,
  Tabs,
  Drawer,
  Modal
} from '@/components/ui/FinalComponents';
```

---

# 🧪 Testing

```jsx
// Spinner
const spinner = screen.getByRole('status');
expect(spinner).toBeInTheDocument();

// Tooltip
const button = screen.getByText('Salvar');
fireEvent.mouseEnter(button);
await waitFor(() => {
  expect(screen.getByRole('tooltip')).toBeVisible();
});

// Menu
const menuItem = screen.getByText('Dashboard');
fireEvent.click(menuItem);
expect(menuItem).toHaveClass('active');

// Tabs
const tab = screen.getByText('Detalhes');
fireEvent.click(tab);
expect(tab).toHaveAttribute('aria-selected', 'true');

// Drawer
const drawer = screen.getByRole('dialog');
expect(drawer).toBeVisible();
fireEvent.keyDown(drawer, { key: 'Escape' });
expect(drawer).not.toBeVisible();

// Modal
const modal = screen.getByRole('dialog');
const overlay = modal.parentElement;
fireEvent.click(overlay);
expect(modal).not.toBeVisible();
```

---

# 📝 Changelog

**v1.0.0 - Inicial**
- ✅ Spinner (3 tamanhos)
- ✅ Tooltip (4 posições)
- ✅ Menu (colapsável)
- ✅ Tabs (2 variantes)
- ✅ Drawer (left/right)
- ✅ Modal (3 tamanhos)
- ✅ Todos WCAG AA compliant
- ✅ Animações suaves
- ✅ Esc fecha Drawer/Modal
- ✅ Click fora fecha
- ✅ Focus trap

---

# 🎉 Resumo

**7 componentes essenciais finalizados:**
1. **Spinner** - Loading states
2. **Tooltip** - Ajuda contextual (com arrow)
3. **Menu** - Navegação sidebar
4. **Tabs** - Navegação por abas (underline + pill)
5. **Drawer** - Painel lateral
6. **Modal** - Janela centralizada
7. **Breadcrumb** - Navegação hierárquica

**Todos com:**
- ✅ WCAG AA
- ✅ Animações suaves
- ✅ Acessibilidade completa
- ✅ Design System Portal Empresa

**Design System 100% completo!** 🚀

---

## 📊 Componentes Totais

```
17 Componentes Completos:

✅ Core Inputs (3):     Button, Input, Select
✅ Form Inputs (4):     Textarea, Checkbox, Radio, Switch
✅ Data Display (2):    Table, Badge
✅ Feedback (3):        Toast, Spinner, Tooltip
✅ Overlays (2):        Drawer, Modal
✅ Navigation (3):      Menu, Tabs, Breadcrumb
```

---

## 🔗 Imports

```jsx
// Final Components
import { 
  Spinner,
  Tooltip,
  Menu,
  Tabs,
  Drawer,
  Modal,
  Breadcrumb
} from '@/components/ui/FinalComponents';

// Form Components
import {
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
  Switch
} from '@/components/ui/FormComponents';

// Others
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Toast } from '@/components/ui/Toast';
```
