# Como Usar Table - Guia Prático

## 🎯 Melhorias Aplicadas (vs versão original)

### ✅ **Alinhamento com Design System**
- Cores do Portal Empresa (verde #04843B, cinzas consistentes)
- Tipografia Inter em todos os tamanhos
- Espaçamentos padronizados (12px, 16px)
- Border radius consistente (8px)

### ✅ **Acessibilidade WCAG AA**
- **Contrast ratio 4.5:1** em todos os textos
- **Hover verde claro** (#E6F4ED) altamente visível
- **Setas de ordenação claras** (↑↓↕)
- **Cursor pointer** em elementos clicáveis
- **Font-size mínimo 12px** (headers) e 14px (corpo)

### ✅ **Melhorias Visuais**
- **Header cinza claro** (#F9F9F9) vs branco - melhor separação
- **Hover verde** vs azul - consistência com brand
- **Badges redesenhados** - cores do sistema semântico
- **Striped rows** mais suave
- **Borda inferior 2px** no header para destaque

---

## 📚 Propriedades (Props)

```typescript
interface TableProps {
  columns: Column[];           // Array de colunas
  data: any[];                 // Array de dados
  striped?: boolean;           // Linhas zebradas (default: false)
  hoverable?: boolean;         // Hover nas linhas (default: true)
  bordered?: boolean;          // Borda externa (default: false)
  compact?: boolean;           // Padding reduzido (default: false)
  sortable?: boolean;          // Ordenação (default: true)
  onRowClick?: (row) => void;  // Callback ao clicar na linha
  emptyMessage?: string;       // Mensagem quando vazio
  maxHeight?: string;          // Altura máxima com scroll (ex: '400px', '60vh')
  pagination?: boolean;        // Habilita paginação (default: false)
  pageSize?: number;           // Linhas por página (default: 10)
}

interface Column {
  key: string;                 // Chave do dado
  label: string;               // Texto do header
  sortable?: boolean;          // Se pode ordenar (default: true)
  render?: (value, row) => JSX.Element; // Renderização customizada
}
```

---

## 💡 Casos de Uso

### 1. Tabela Básica
```jsx
const columns = [
  { key: 'name', label: 'Nome' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Cargo' }
];

const data = [
  { id: 1, name: 'João Silva', email: 'joao@empresa.com', role: 'Desenvolvedor' },
  { id: 2, name: 'Maria Santos', email: 'maria@empresa.com', role: 'Designer' }
];

<Table columns={columns} data={data} />
```

---

### 2. Tabela Zebrada (Striped)
```jsx
<Table 
  columns={columns} 
  data={data} 
  striped 
/>
```
**Quando usar:** Listas longas onde é difícil seguir a linha horizontalmente

---

### 3. Tabela com Bordas
```jsx
<Table 
  columns={columns} 
  data={data} 
  bordered 
  striped 
/>
```
**Quando usar:** Quando a tabela precisa se destacar do fundo

---

### 4. Tabela Compacta
```jsx
<Table 
  columns={columns} 
  data={data} 
  compact 
  striped 
/>
```
**Quando usar:** Dashboards, muitos dados na tela, espaço limitado

---

### 5. Tabela com Badges (Status)
```jsx
const columns = [
  { key: 'name', label: 'Nome' },
  { key: 'email', label: 'Email' },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => {
      const statusMap = {
        active: { label: 'Ativo', variant: 'success' },
        inactive: { label: 'Inativo', variant: 'neutral' },
        pending: { label: 'Pendente', variant: 'warning' }
      };
      const status = statusMap[value];
      return <Badge variant={status.variant}>{status.label}</Badge>;
    }
  }
];

<Table columns={columns} data={data} striped />
```
**Quando usar:** Status, categorias, tags, qualquer valor que se beneficia de cor

---

### 6. Tabela Ordenável (Sortable)
```jsx
// Por padrão já é sortable!
<Table columns={columns} data={data} striped />

// Desabilitar ordenação em coluna específica
const columns = [
  { key: 'name', label: 'Nome' },
  { key: 'avatar', label: 'Avatar', sortable: false } // Não ordena
];

// Desabilitar ordenação completamente
<Table columns={columns} data={data} sortable={false} />
```
**Quando usar:** Sempre que os dados podem ser ordenados (quase sempre!)

---

### 7. Tabela Clicável
```jsx
const handleRowClick = (row) => {
  console.log('Clicou em:', row);
  // Navegar, abrir modal, etc
};

<Table 
  columns={columns} 
  data={data} 
  onRowClick={handleRowClick}
  striped 
/>
```
**Quando usar:** Linhas levam a detalhes, edição, navegação

---

### 8. Tabela com Formatação Customizada
```jsx
const columns = [
  { key: 'name', label: 'Nome' },
  { 
    key: 'salary', 
    label: 'Salário',
    render: (value) => `R$ ${value.toLocaleString('pt-BR')}`
  },
  { 
    key: 'joinDate', 
    label: 'Data de Entrada',
    render: (value) => new Date(value).toLocaleDateString('pt-BR')
  },
  {
    key: 'email',
    label: 'Email',
    render: (value) => <a href={`mailto:${value}`}>{value}</a>
  }
];

<Table columns={columns} data={data} striped />
```
**Quando usar:** Datas, moedas, links, formatação específica

---

### 9. Estado Vazio
```jsx
<Table 
  columns={columns} 
  data={[]} 
  emptyMessage="Nenhum funcionário cadastrado ainda"
/>
```
**Quando usar:** Lista pode estar vazia (sempre!)

---

### 10. Tabela com Scroll (Listas Longas) ⭐
```jsx
<Table 
  columns={columns}
  data={longDataset} // 150+ linhas
  maxHeight="400px"   // Altura máxima
  striped
  compact
/>

// Também funciona com viewport height
<Table 
  maxHeight="60vh"
  // ...
/>
```
**Quando usar:** 
- Dashboards (espaço limitado)
- Muitas linhas (>50)
- Precisa ver header sempre

**Características:**
- ✅ Header fica fixo ao rolar
- ✅ Scroll vertical automático
- ✅ Scroll horizontal se necessário

---

### 11. Tabela com Paginação ⭐
```jsx
<Table 
  columns={columns}
  data={longDataset} // 150+ linhas
  pagination         // Habilita paginação
  pageSize={10}      // 10 linhas por página
  striped
  bordered
/>

// Paginação customizada
<Table 
  pagination
  pageSize={25}  // 25 linhas por página
  // ...
/>
```
**Quando usar:**
- Listagens administrativas
- Tabelas de relatórios
- Usuário precisa navegar dados

**Características:**
- ✅ Botões Anterior/Próximo
- ✅ Números de página
- ✅ Contador de registros
- ✅ Máximo 5 páginas visíveis

---

## 🤔 Scroll vs Paginação - Qual Usar?

| Cenário | Recomendação |
|---------|-------------|
| **Dashboard (espaço fixo)** | `maxHeight="400px"` ✅ |
| **Lista administrativa** | `pagination` ✅ |
| **50-100 linhas** | Ambos funcionam |
| **100+ linhas** | `pagination` (melhor performance) |
| **Dados em tempo real** | `maxHeight` (sem reload) |
| **Impressão/Export** | Sem paginação |

---

## 🎨 Variantes de Badge

```jsx
<Badge variant="success">Ativo</Badge>
<Badge variant="error">Erro</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="info">Novo</Badge>
<Badge variant="neutral">Inativo</Badge>

// Tamanhos
<Badge size="small">Pequeno</Badge>
<Badge size="medium">Médio</Badge>
```

---

## 🎯 Quando Usar Cada Opção

| Opção | Quando usar |
|-------|-------------|
| **striped** | Listas longas (>5 linhas) |
| **bordered** | Destaque visual, separar do fundo |
| **compact** | Dashboards, muito conteúdo |
| **sortable** | Quase sempre (dados ordenáveis) |
| **onRowClick** | Linhas navegam/abrem algo |
| **badges** | Status, categorias, tags |

---

## 🔧 Exemplos Avançados

### Dashboard de Usuários
```jsx
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nome' },
  { 
    key: 'role', 
    label: 'Cargo',
    render: (value) => <Badge variant="info" size="small">{value}</Badge>
  },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => {
      const variants = {
        active: 'success',
        inactive: 'neutral',
        pending: 'warning'
      };
      return <Badge variant={variants[value]} size="small">{value}</Badge>;
    }
  },
  { 
    key: 'lastLogin', 
    label: 'Último Acesso',
    render: (value) => new Date(value).toLocaleString('pt-BR')
  }
];

<Table 
  columns={columns} 
  data={users} 
  striped 
  compact 
  bordered
  onRowClick={(user) => navigate(`/users/${user.id}`)}
/>
```

---

### Tabela de Produtos (E-commerce)
```jsx
const columns = [
  { key: 'sku', label: 'SKU' },
  { 
    key: 'name', 
    label: 'Produto',
    render: (value, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src={row.image} alt={value} style={{ width: 32, height: 32, borderRadius: 4 }} />
        <span>{value}</span>
      </div>
    )
  },
  { 
    key: 'price', 
    label: 'Preço',
    render: (value) => `R$ ${value.toFixed(2)}`
  },
  { 
    key: 'stock', 
    label: 'Estoque',
    render: (value) => {
      const variant = value > 10 ? 'success' : value > 0 ? 'warning' : 'error';
      return <Badge variant={variant}>{value} un</Badge>;
    }
  }
];

<Table columns={columns} data={products} striped />
```

---

### Tabela de Transações (Financeiro)
```jsx
const columns = [
  { key: 'date', label: 'Data', render: (v) => new Date(v).toLocaleDateString('pt-BR') },
  { key: 'description', label: 'Descrição' },
  { 
    key: 'amount', 
    label: 'Valor',
    render: (value, row) => {
      const color = row.type === 'credit' ? '#04843B' : '#DC2626';
      return <span style={{ color, fontWeight: 600 }}>
        {row.type === 'credit' ? '+' : '-'} R$ {Math.abs(value).toFixed(2)}
      </span>;
    }
  },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => {
      const map = {
        completed: { label: 'Concluído', variant: 'success' },
        pending: { label: 'Pendente', variant: 'warning' },
        failed: { label: 'Falhou', variant: 'error' }
      };
      return <Badge variant={map[value].variant} size="small">{map[value].label}</Badge>;
    }
  }
];

<Table columns={columns} data={transactions} striped bordered />
```

---

## 🚫 Anti-padrões

### ❌ Muitas colunas sem compact
```jsx
// ERRADO - 10+ colunas com padding normal
<Table columns={manyColumns} data={data} />

// CORRETO - Use compact
<Table columns={manyColumns} data={data} compact />
```

---

### ❌ Lista longa sem striped
```jsx
// ERRADO - 50+ linhas sem zebra
<Table columns={columns} data={longList} />

// CORRETO
<Table columns={columns} data={longList} striped />
```

---

### ❌ Tabela clicável sem indicação
```jsx
// ERRADO - onRowClick mas sem feedback visual
<Table columns={columns} data={data} onRowClick={handler} hoverable={false} />

// CORRETO - Hover habilitado (default)
<Table columns={columns} data={data} onRowClick={handler} />
```

---

### ❌ Status só com texto
```jsx
// ERRADO - Difícil distinguir visualmente
{ key: 'status', label: 'Status' } // Só texto "ativo", "inativo"

// CORRETO - Usa badge com cores
{ 
  key: 'status', 
  render: (v) => <Badge variant={v === 'active' ? 'success' : 'neutral'}>{v}</Badge>
}
```

---

## 🎨 Design Tokens da Table

### Cores
```javascript
// Headers
header.background: '#F9F9F9'  // Cinza claro
header.text: '#393939'        // Cinza escuro

// Rows
row.background: '#FFFFFF'     // Branco
row.striped: '#F9F9F9'        // Cinza claro (alternado)
row.hover: '#E6F4ED'          // Verde claro (brand)

// Borders
border.color: '#DDDDDD'       // Cinza médio
border.header: 2px            // Borda do header (destaque)
border.row: 1px               // Borda das linhas
```

### Espaçamentos
```javascript
padding.normal: '16px'   // Padrão
padding.compact: '12px'  // Compacto
```

### Tipografia
```javascript
// Headers
header.fontSize: '12px'
header.fontWeight: 600   // Semibold

// Body
body.fontSize: '14px'
body.fontWeight: 400     // Regular
```

---

## ♿ Acessibilidade

### ✅ Implementado
- Contrast ratio 4.5:1 (WCAG AA)
- Hover state visível
- Cursor pointer em clicáveis
- Sort indicators claros
- Font-size mínimo 12px

### 🎯 Melhor Prática
```jsx
// Sempre forneça emptyMessage descritivo
<Table 
  data={[]} 
  emptyMessage="Nenhum resultado encontrado. Tente outro filtro."
/>

// Use badges para status visuais
{ key: 'status', render: (v) => <Badge>{v}</Badge> }

// Ordenação sempre habilitada por padrão
<Table sortable /> // ✅ default true
```

---

## 📦 Importação

```jsx
import { Table, Badge } from '@/components/ui';

function UsersList() {
  return (
    <Table 
      columns={columns}
      data={users}
      striped
      onRowClick={handleClick}
    />
  );
}
```

---

## 🎯 Checklist de Uso

Antes de usar Table:

- [ ] Definiu todas as colunas com `key` e `label`
- [ ] Dados têm `id` único (ou usa index)
- [ ] Status usam badges (não só texto)
- [ ] Datas/moedas formatadas com `render`
- [ ] Lista longa? Usa `striped`
- [ ] Muitas colunas? Usa `compact`
- [ ] Linhas clicáveis? Usa `onRowClick`
- [ ] Pode estar vazia? Define `emptyMessage`

---

## 📝 Resumo

**Table é versátil:**
- **Básica:** `<Table columns={} data={} />`
- **Visual:** Adiciona `striped`, `bordered`, `compact`
- **Interativa:** Adiciona `onRowClick`
- **Customizada:** Usa `render` nas colunas

**Badge complementa Table:**
- Status, categorias, tags
- 5 variantes de cor
- 2 tamanhos

**Sempre alinhado com Design System Portal Empresa!** 🎨
