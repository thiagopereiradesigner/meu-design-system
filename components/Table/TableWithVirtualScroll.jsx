import React, { useState, useRef, useEffect } from 'react';

// Design Tokens (mesmos do Button, Input, Select)
const tokens = {
  colors: {
    primary: {
      50: '#E6F4ED',
      100: '#CCE9DB',
      200: '#99D3B7',
      500: '#04843B',
      600: '#067647',
      700: '#005A1A',
    },
    neutral: {
      0: '#FFFFFF',
      50: '#F9F9F9',
      100: '#F3F3F3',
      200: '#C6C6C6',
      300: '#999999',
      500: '#656976',
      700: '#333333',
      800: '#1A1A1A',
    },
    content: {
      primary: '#393939',
      secondary: '#5E5E5E',
      tertiary: '#727272'
    },
    border: {
      primary: '#393939',
      secondary: '#DDDDDD',
    },
    semantic: {
      success: '#04843B',
      error: '#DC2626',
      warning: '#F59E0B',
      info: '#3B82F6'
    }
  },
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: {
      xs: '10px',
      sm: '12px',
      md: '14px',
      lg: '16px',
      xl: '18px'
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      normal: 1.5
    }
  },
};

// ==================== BADGE COMPONENT ====================
const Badge = ({ children, variant = 'success', size = 'medium' }) => {
  const variants = {
    success: {
      backgroundColor: tokens.colors.primary[50],
      color: tokens.colors.primary[700],
    },
    error: {
      backgroundColor: '#FEE2E2',
      color: tokens.colors.semantic.error,
    },
    warning: {
      backgroundColor: '#FEF3C7',
      color: '#92400E',
    },
    info: {
      backgroundColor: '#DBEAFE',
      color: '#1E40AF',
    },
    neutral: {
      backgroundColor: tokens.colors.neutral[100],
      color: tokens.colors.content.secondary,
    }
  };

  const sizes = {
    small: {
      padding: `${tokens.spacing.xxs} ${tokens.spacing.xs}`,
      fontSize: tokens.typography.fontSize.xs,
    },
    medium: {
      padding: `${tokens.spacing.xxs} ${tokens.spacing.sm}`,
      fontSize: tokens.typography.fontSize.sm,
    }
  };

  const badgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.borderRadius.xs,
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.fontWeight.medium,
    lineHeight: tokens.typography.lineHeight.normal,
    whiteSpace: 'nowrap',
    ...variants[variant],
    ...sizes[size]
  };

  return <span style={badgeStyles}>{children}</span>;
};

// ==================== TABLE WITH VIRTUAL SCROLLING ====================
const Table = ({ 
  columns = [], 
  data = [], 
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  sortable = true,
  onRowClick,
  emptyMessage = 'Nenhum registro encontrado',
  height = '500px', // Altura do container (obrigatório para virtual scroll)
  rowHeight = null, // Altura de cada linha (auto-calculado se null)
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [hoveredRow, setHoveredRow] = useState(null);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  // Auto-calcula altura da linha baseado no compact
  const calculatedRowHeight = rowHeight || (compact ? 45 : 53);

  // Ordenação
  const handleSort = (key) => {
    if (!sortable) return;
    
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Virtual Scrolling Calculation
  const containerHeight = parseInt(height);
  const totalHeight = sortedData.length * calculatedRowHeight;
  const visibleCount = Math.ceil(containerHeight / calculatedRowHeight);
  const bufferCount = 5; // Linhas extras para transição suave
  const startIndex = Math.max(0, Math.floor(scrollTop / calculatedRowHeight) - bufferCount);
  const endIndex = Math.min(sortedData.length, startIndex + visibleCount + bufferCount * 2);
  const visibleData = sortedData.slice(startIndex, endIndex);
  const offsetY = startIndex * calculatedRowHeight;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  // Estilos
  const tableContainerStyles = {
    width: '100%',
    height: height,
    borderRadius: tokens.borderRadius.sm,
    border: bordered ? `1px solid ${tokens.colors.border.secondary}` : 'none',
    backgroundColor: tokens.colors.neutral[0],
    overflow: 'hidden',
    position: 'relative',
  };

  const scrollContainerStyles = {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    position: 'relative',
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: tokens.typography.fontFamily,
    tableLayout: 'fixed',
  };

  const theadStyles = {
    backgroundColor: tokens.colors.neutral[50],
    borderBottom: `2px solid ${tokens.colors.border.secondary}`,
    position: 'sticky',
    top: 0,
    zIndex: 10,
  };

  const thStyles = (isSortable) => ({
    padding: compact ? tokens.spacing.sm : tokens.spacing.md,
    textAlign: 'left',
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: tokens.colors.content.primary,
    cursor: isSortable ? 'pointer' : 'default',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    backgroundColor: tokens.colors.neutral[50],
  });

  const getTrStyles = (index, isHovered) => ({
    backgroundColor: isHovered && hoverable 
      ? tokens.colors.primary[50]
      : striped && index % 2 === 1 
        ? tokens.colors.neutral[50]
        : tokens.colors.neutral[0],
    borderBottom: `1px solid ${tokens.colors.border.secondary}`,
    transition: 'background-color 0.15s ease',
    cursor: onRowClick ? 'pointer' : 'default',
    height: `${calculatedRowHeight}px`,
  });

  const tdStyles = {
    padding: compact ? tokens.spacing.sm : tokens.spacing.md,
    fontSize: tokens.typography.fontSize.md,
    color: tokens.colors.content.primary,
    lineHeight: tokens.typography.lineHeight.normal,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const sortIconStyles = {
    marginLeft: tokens.spacing.xs,
    fontSize: '10px',
    color: tokens.colors.content.tertiary,
  };

  const emptyStateStyles = {
    padding: tokens.spacing.xl,
    textAlign: 'center',
    color: tokens.colors.content.tertiary,
    fontSize: tokens.typography.fontSize.md,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const spacerStyles = {
    height: `${offsetY}px`,
  };

  const virtualBodyHeightStyles = {
    height: `${totalHeight}px`,
    position: 'relative',
  };

  if (data.length === 0) {
    return (
      <div style={tableContainerStyles}>
        <div style={emptyStateStyles}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div style={tableContainerStyles}>
      <div 
        style={scrollContainerStyles}
        onScroll={handleScroll}
        ref={containerRef}
      >
        <div style={virtualBodyHeightStyles}>
          <table style={tableStyles}>
            <thead style={theadStyles}>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    style={thStyles(sortable && column.sortable !== false)}
                    onClick={() => column.sortable !== false && handleSort(column.key)}
                  >
                    {column.label}
                    {sortable && column.sortable !== false && (
                      <span style={sortIconStyles}>
                        {sortConfig.key === column.key
                          ? sortConfig.direction === 'asc' ? '↑' : '↓'
                          : '↕'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
          </table>

          {/* Spacer antes das linhas visíveis */}
          <div style={spacerStyles} />

          {/* Linhas visíveis */}
          <table style={tableStyles}>
            <tbody>
              {visibleData.map((row, visibleIndex) => {
                const actualIndex = startIndex + visibleIndex;
                return (
                  <tr
                    key={row.id || actualIndex}
                    style={getTrStyles(actualIndex, hoveredRow === actualIndex)}
                    onMouseEnter={() => setHoveredRow(actualIndex)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {columns.map((column) => (
                      <td key={column.key} style={tdStyles}>
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==================== DEMO ====================
export default function TableDemo() {
  // Gera dataset grande para demonstração
  const generateLargeDataset = (count) => {
    const firstNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Beatriz', 'Rafael', 'Juliana', 'Lucas', 'Fernanda', 'Bruno', 'Camila', 'Diego', 'Elena', 'Felipe'];
    const lastNames = ['Silva', 'Santos', 'Costa', 'Oliveira', 'Ferreira', 'Rodrigues', 'Almeida', 'Lima', 'Souza', 'Pereira', 'Carvalho', 'Ribeiro', 'Martins', 'Rocha', 'Alves'];
    const roles = ['Desenvolvedor', 'Designer', 'Product Manager', 'Analista de Dados', 'QA Engineer', 'DevOps', 'Tech Lead', 'UX Researcher', 'Scrum Master'];
    const departments = ['Tecnologia', 'Produto', 'Analytics', 'Marketing', 'Vendas', 'RH', 'Financeiro'];
    const statuses = ['active', 'inactive', 'vacation'];
    
    return Array.from({ length: count }, (_, i) => {
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
      const name = `${firstName} ${lastName}`;
      
      return {
        id: i + 1,
        name,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@empresa.com`,
        role: roles[i % roles.length],
        status: statuses[i % statuses.length],
        department: departments[i % departments.length],
        joinDate: `${2020 + (i % 5)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`
      };
    });
  };

  const data10k = generateLargeDataset(10000);
  const data100 = generateLargeDataset(100);

  const columnsBasic = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Departamento' },
  ];

  const columnsComplete = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Departamento' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => {
        const statusMap = {
          active: { label: 'Ativo', variant: 'success' },
          inactive: { label: 'Inativo', variant: 'neutral' },
          vacation: { label: 'Férias', variant: 'warning' },
        };
        const status = statusMap[value];
        return <Badge variant={status.variant} size="small">{status.label}</Badge>;
      }
    },
    { 
      key: 'joinDate', 
      label: 'Data de Entrada',
      render: (value) => new Date(value).toLocaleDateString('pt-BR')
    },
  ];

  const handleRowClick = (row) => {
    console.log('Clicou em:', row.name);
  };

  const containerStyle = {
    padding: '40px',
    backgroundColor: tokens.colors.neutral[0],
    fontFamily: tokens.typography.fontFamily,
    minHeight: '100vh'
  };

  const sectionStyle = {
    marginBottom: '48px',
    padding: '32px',
    backgroundColor: tokens.colors.neutral[50],
    borderRadius: tokens.borderRadius.md
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: tokens.typography.fontWeight.bold,
    marginBottom: '24px',
    color: tokens.colors.neutral[800]
  };

  const subtitleStyle = {
    fontSize: '14px',
    color: tokens.colors.content.secondary,
    marginBottom: '16px'
  };

  const codeBlockStyle = {
    backgroundColor: tokens.colors.neutral[800],
    color: '#E6F4ED',
    padding: tokens.spacing.md,
    borderRadius: tokens.borderRadius.xs,
    fontSize: tokens.typography.fontSize.sm,
    fontFamily: 'monospace',
    marginTop: tokens.spacing.md,
    overflowX: 'auto'
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: tokens.typography.fontWeight.bold, marginBottom: '8px', color: tokens.colors.primary[700] }}>
          Portal Empresa - Design System
        </h1>
        <p style={{ fontSize: '16px', color: tokens.colors.content.secondary }}>
          Table com Virtual Scrolling (Performance Otimizada)
        </p>
      </div>

      {/* 100 linhas */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>📊 100 Linhas (Scroll Simples)</h2>
        <p style={subtitleStyle}>
          Para listas pequenas/médias (&lt;500 linhas), scroll normal funciona bem
        </p>
        <Table 
          columns={columnsBasic}
          data={data100}
          height="400px"
          striped
          bordered
          compact
        />
        <div style={codeBlockStyle}>
          &lt;Table data=&#123;100linhas&#125; height="400px" striped /&gt;
        </div>
      </div>

      {/* 10.000 linhas */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>⚡ 10.000 Linhas (Virtual Scrolling)</h2>
        <p style={subtitleStyle}>
          Renderiza apenas linhas visíveis. Suporta milhões de linhas sem lag!
        </p>
        <Table 
          columns={columnsComplete}
          data={data10k}
          height="500px"
          striped
          bordered
          compact
          onRowClick={handleRowClick}
        />
        <div style={codeBlockStyle}>
          &lt;Table data=&#123;10000linhas&#125; height="500px" /&gt;<br />
          💡 Apenas ~15 linhas renderizadas por vez<br />
          💡 Scroll suave e performance perfeita
        </div>
      </div>

      {/* Performance Info */}
      <div style={{ 
        marginTop: '48px', 
        padding: '24px', 
        backgroundColor: tokens.colors.primary[50], 
        borderRadius: tokens.borderRadius.md,
        borderLeft: `4px solid ${tokens.colors.primary[500]}`
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: tokens.typography.fontWeight.semibold, marginBottom: '12px', color: tokens.colors.primary[800] }}>
          ⚡ Como Funciona o Virtual Scrolling
        </h3>
        <ul style={{ fontSize: '14px', color: tokens.colors.neutral[700], lineHeight: 1.6, paddingLeft: '20px' }}>
          <li><strong>Renderiza apenas o visível:</strong> Se a tela mostra 10 linhas, apenas ~15-20 são renderizadas (com buffer)</li>
          <li><strong>Scroll ilimitado:</strong> Pode ter 10.000, 100.000 linhas sem lag</li>
          <li><strong>Performance constante:</strong> Mesma velocidade com 100 ou 1 milhão de linhas</li>
          <li><strong>Header fixo:</strong> Cabeçalho sempre visível ao rolar</li>
          <li><strong>Buffer inteligente:</strong> 5 linhas extras acima/abaixo para transição suave</li>
        </ul>
      </div>

      {/* Comparison */}
      <div style={{ 
        marginTop: '24px', 
        padding: '24px', 
        backgroundColor: tokens.colors.neutral[100], 
        borderRadius: tokens.borderRadius.md,
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: tokens.typography.fontWeight.semibold, marginBottom: '12px', color: tokens.colors.content.primary }}>
          📈 Comparação de Performance
        </h3>
        <table style={{ width: '100%', fontSize: '14px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: `1px solid ${tokens.colors.border.secondary}` }}>Linhas</th>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: `1px solid ${tokens.colors.border.secondary}` }}>Scroll Normal</th>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: `1px solid ${tokens.colors.border.secondary}` }}>Virtual Scroll</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px' }}>100</td>
              <td style={{ padding: '8px' }}>✅ Rápido</td>
              <td style={{ padding: '8px' }}>✅ Rápido</td>
            </tr>
            <tr style={{ backgroundColor: tokens.colors.neutral[50] }}>
              <td style={{ padding: '8px' }}>1.000</td>
              <td style={{ padding: '8px' }}>⚠️ Lento</td>
              <td style={{ padding: '8px' }}>✅ Rápido</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>10.000</td>
              <td style={{ padding: '8px' }}>❌ Trava</td>
              <td style={{ padding: '8px' }}>✅ Rápido</td>
            </tr>
            <tr style={{ backgroundColor: tokens.colors.neutral[50] }}>
              <td style={{ padding: '8px' }}>100.000</td>
              <td style={{ padding: '8px' }}>❌ Impossível</td>
              <td style={{ padding: '8px' }}>✅ Rápido</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Usage */}
      <div style={{ 
        marginTop: '24px', 
        padding: '24px', 
        backgroundColor: tokens.colors.neutral[800],
        color: tokens.colors.neutral[0],
        borderRadius: tokens.borderRadius.md,
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: tokens.typography.fontWeight.semibold, marginBottom: '16px' }}>
          💻 Como Usar
        </h3>
        <pre style={{ fontSize: '13px', lineHeight: 1.6, margin: 0, fontFamily: 'monospace' }}>
{`import { Table } from '@/components/ui';

// Para lista GRANDE (1000+ linhas)
<Table 
  columns={columns}
  data={bigData}       // 10.000 linhas
  height="500px"       // Altura fixa
  striped
  compact              // Economiza espaço
  onRowClick={handler}
/>

// Para lista PEQUENA (<500 linhas)
<Table 
  columns={columns}
  data={smallData}     // 100 linhas
  height="400px"
  striped
/>`}
        </pre>
      </div>
    </div>
  );
}
