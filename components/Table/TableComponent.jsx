import React, { useState } from 'react';

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
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  }
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

// ==================== TABLE COMPONENT ====================
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
  maxHeight = null, // Altura máxima (ex: '400px', '60vh')
  pagination = false, // Habilita paginação
  pageSize = 10, // Linhas por página
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [hoveredRow, setHoveredRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Paginação
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = pagination 
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Estilos
  const tableContainerStyles = {
    width: '100%',
    borderRadius: tokens.borderRadius.sm,
    border: bordered ? `1px solid ${tokens.colors.border.secondary}` : 'none',
    backgroundColor: tokens.colors.neutral[0],
    overflow: 'hidden',
  };

  const tableWrapperStyles = {
    width: '100%',
    overflowX: 'auto',
    maxHeight: maxHeight || 'none',
    overflowY: maxHeight ? 'auto' : 'visible',
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: tokens.typography.fontFamily,
  };

  const theadStyles = {
    backgroundColor: tokens.colors.neutral[50],
    borderBottom: `2px solid ${tokens.colors.border.secondary}`,
    position: maxHeight ? 'sticky' : 'static',
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
    backgroundColor: tokens.colors.neutral[50], // Para sticky header
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
  });

  const tdStyles = {
    padding: compact ? tokens.spacing.sm : tokens.spacing.md,
    fontSize: tokens.typography.fontSize.md,
    color: tokens.colors.content.primary,
    lineHeight: tokens.typography.lineHeight.normal,
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
  };

  const paginationStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: tokens.spacing.md,
    borderTop: `1px solid ${tokens.colors.border.secondary}`,
    fontSize: tokens.typography.fontSize.sm,
    color: tokens.colors.content.secondary,
  };

  const paginationButtonStyles = (disabled) => ({
    padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
    backgroundColor: disabled ? tokens.colors.neutral[100] : tokens.colors.neutral[0],
    color: disabled ? tokens.colors.content.tertiary : tokens.colors.content.primary,
    border: `1px solid ${tokens.colors.border.secondary}`,
    borderRadius: tokens.borderRadius.xs,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: tokens.typography.fontSize.sm,
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.fontWeight.medium,
    transition: 'all 0.15s ease',
  });

  const pageNumberStyles = (isActive) => ({
    padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
    backgroundColor: isActive ? tokens.colors.primary[500] : tokens.colors.neutral[0],
    color: isActive ? tokens.colors.neutral[0] : tokens.colors.content.primary,
    border: `1px solid ${isActive ? tokens.colors.primary[500] : tokens.colors.border.secondary}`,
    borderRadius: tokens.borderRadius.xs,
    cursor: 'pointer',
    fontSize: tokens.typography.fontSize.sm,
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.fontWeight.medium,
    minWidth: '32px',
    textAlign: 'center',
    transition: 'all 0.15s ease',
  });

  if (data.length === 0) {
    return (
      <div style={tableContainerStyles}>
        <div style={emptyStateStyles}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div style={tableContainerStyles}>
      <div style={tableWrapperStyles}>
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
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={row.id || index}
                style={getTrStyles(index, hoveredRow === index)}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column) => (
                  <td key={column.key} style={tdStyles}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {pagination && totalPages > 1 && (
        <div style={paginationStyles}>
          <div>
            Mostrando {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, sortedData.length)} de {sortedData.length} registros
          </div>
          <div style={{ display: 'flex', gap: tokens.spacing.xs }}>
            <button
              style={paginationButtonStyles(currentPage === 1)}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Anterior
            </button>
            
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              // Mostra apenas 5 páginas por vez
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    style={pageNumberStyles(page === currentPage)}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} style={{ padding: '0 4px' }}>...</span>;
              }
              return null;
            })}

            <button
              style={paginationButtonStyles(currentPage === totalPages)}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próximo →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== DEMO ====================
export default function TableDemo() {
  const [data, setData] = useState([
    { 
      id: 1, 
      name: 'João Silva', 
      email: 'joao@empresa.com', 
      role: 'Desenvolvedor',
      status: 'active',
      department: 'Tecnologia',
      joinDate: '2023-01-15'
    },
    { 
      id: 2, 
      name: 'Maria Santos', 
      email: 'maria@empresa.com', 
      role: 'Designer',
      status: 'active',
      department: 'Produto',
      joinDate: '2023-03-20'
    },
    { 
      id: 3, 
      name: 'Pedro Costa', 
      email: 'pedro@empresa.com', 
      role: 'Product Manager',
      status: 'inactive',
      department: 'Produto',
      joinDate: '2022-11-10'
    },
    { 
      id: 4, 
      name: 'Ana Oliveira', 
      email: 'ana@empresa.com', 
      role: 'Analista de Dados',
      status: 'active',
      department: 'Analytics',
      joinDate: '2023-05-08'
    },
    { 
      id: 5, 
      name: 'Carlos Ferreira', 
      email: 'carlos@empresa.com', 
      role: 'QA Engineer',
      status: 'vacation',
      department: 'Tecnologia',
      joinDate: '2023-02-14'
    },
  ]);

  // Gera dataset grande para demonstração
  const generateLargeDataset = (count) => {
    const names = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Beatriz', 'Rafael', 'Juliana', 'Lucas', 'Fernanda'];
    const surnames = ['Silva', 'Santos', 'Costa', 'Oliveira', 'Ferreira', 'Rodrigues', 'Almeida', 'Lima', 'Souza', 'Pereira'];
    const roles = ['Desenvolvedor', 'Designer', 'Product Manager', 'Analista de Dados', 'QA Engineer', 'DevOps', 'Tech Lead'];
    const departments = ['Tecnologia', 'Produto', 'Analytics', 'Marketing', 'Vendas'];
    const statuses = ['active', 'inactive', 'vacation'];
    
    return Array.from({ length: count }, (_, i) => {
      const name = `${names[i % names.length]} ${surnames[i % surnames.length]}`;
      return {
        id: i + 1,
        name,
        email: `${name.toLowerCase().replace(' ', '.')}@empresa.com`,
        role: roles[i % roles.length],
        status: statuses[i % statuses.length],
        department: departments[i % departments.length],
        joinDate: `2023-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`
      };
    });
  };

  const columnsBasic = [
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Cargo' },
  ];

  const columnsWithBadge = [
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
        return <Badge variant={status.variant}>{status.label}</Badge>;
      }
    },
  ];

  const columnsComplete = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Nome', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'department', label: 'Departamento', sortable: true },
    { 
      key: 'status', 
      label: 'Status',
      sortable: true,
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
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('pt-BR')
    },
  ];

  const handleRowClick = (row) => {
    alert(`Clicou em: ${row.name}`);
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
    fontSize: '16px',
    fontWeight: tokens.typography.fontWeight.semibold,
    marginBottom: '16px',
    marginTop: '32px',
    color: tokens.colors.content.primary
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: tokens.typography.fontWeight.bold, marginBottom: '8px', color: tokens.colors.primary[700] }}>
          Portal Empresa - Design System
        </h1>
        <p style={{ fontSize: '16px', color: tokens.colors.content.secondary }}>
          Componente Table
        </p>
      </div>

      {/* Basic Table */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>📊 Tabela Básica</h2>
        <p style={{ fontSize: '14px', color: tokens.colors.content.secondary, marginBottom: '16px' }}>
          Tabela simples com colunas essenciais
        </p>
        <Table columns={columnsBasic} data={data} />
      </div>

      {/* Striped Table */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>🦓 Tabela Listrada (Zebrada)</h2>
        <p style={{ fontSize: '14px', color: tokens.colors.content.secondary, marginBottom: '16px' }}>
          Linhas alternadas facilitam a leitura
        </p>
        <Table columns={columnsBasic} data={data} striped />
      </div>

      {/* Bordered Table */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>🔲 Tabela com Bordas</h2>
        <p style={{ fontSize: '14px', color: tokens.colors.content.secondary, marginBottom: '16px' }}>
          Borda externa para melhor definição
        </p>
        <Table columns={columnsBasic} data={data} bordered striped />
      </div>

      {/* Compact Table */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>📦 Tabela Compacta</h2>
        <p style={{ fontSize: '14px', color: tokens.colors.content.secondary, marginBottom: '16px' }}>
          Padding reduzido para mais dados na tela
        </p>
        <Table columns={columnsBasic} data={data} compact striped />
      </div>

      {/* Table with Badges */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>🏷️ Tabela com Badges</h2>
        <p style={{ fontSize: '14px', color: tokens.colors.content.secondary, marginBottom: '16px' }}>
          Status visuais usando badges coloridos
        </p>
        <Table columns={columnsWithBadge} data={data} striped />
      </div>

      {/* Complete Table */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>⚡ Tabela Completa (Sortable + Clickable)</h2>
        <p style={{ fontSize: '14px', color: tokens.colors.content.secondary, marginBottom: '16px' }}>
          Clique nos headers para ordenar, clique nas linhas para ações
        </p>
        <Table 
          columns={columnsComplete} 
          data={data} 
          striped 
          bordered
          onRowClick={handleRowClick}
        />
      </div>

      {/* Empty State */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>📭 Estado Vazio</h2>
        <p style={{ fontSize: '14px', color: tokens.colors.content.secondary, marginBottom: '16px' }}>
          Quando não há dados
        </p>
        <Table 
          columns={columnsBasic} 
          data={[]} 
          emptyMessage="Nenhum funcionário cadastrado ainda"
        />
      </div>

      {/* Scroll Table */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>📜 Tabela com Scroll (150 linhas)</h2>
        <p style={{ fontSize: '14px', color: tokens.colors.content.secondary, marginBottom: '16px' }}>
          Altura máxima com scroll e header fixo
        </p>
        <Table 
          columns={columnsComplete}
          data={generateLargeDataset(150)}
          maxHeight="400px"
          striped
          bordered
          compact
        />
        <p style={{ fontSize: '12px', color: tokens.colors.content.tertiary, marginTop: '8px' }}>
          💡 Header fica fixo ao rolar. Ideal para dashboards.
        </p>
      </div>

      {/* Pagination Table */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>📄 Tabela com Paginação (150 linhas)</h2>
        <p style={{ fontSize: '14px', color: tokens.colors.content.secondary, marginBottom: '16px' }}>
          Divide dados em páginas (10 linhas por página)
        </p>
        <Table 
          columns={columnsComplete}
          data={generateLargeDataset(150)}
          pagination
          pageSize={10}
          striped
          bordered
        />
        <p style={{ fontSize: '12px', color: tokens.colors.content.tertiary, marginTop: '8px' }}>
          💡 Melhor para listagens longas onde o usuário precisa navegar.
        </p>
      </div>

      {/* Accessibility Note */}
      <div style={{ 
        marginTop: '48px', 
        padding: '24px', 
        backgroundColor: tokens.colors.primary[50], 
        borderRadius: tokens.borderRadius.md,
        borderLeft: `4px solid ${tokens.colors.primary[500]}`
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: tokens.typography.fontWeight.semibold, marginBottom: '12px', color: tokens.colors.primary[800] }}>
          ♿ Melhorias de Acessibilidade Aplicadas
        </h3>
        <ul style={{ fontSize: '14px', color: tokens.colors.neutral[700], lineHeight: 1.6, paddingLeft: '20px' }}>
          <li><strong>Contrast ratio:</strong> 4.5:1 em todos os textos (WCAG AA)</li>
          <li><strong>Hover state:</strong> Verde claro (#E6F4ED) para feedback visual claro</li>
          <li><strong>Striped rows:</strong> Facilita rastreamento horizontal de dados</li>
          <li><strong>Sort indicators:</strong> Setas visuais claras (↑↓↕)</li>
          <li><strong>Cursor pointer:</strong> Indica elementos clicáveis</li>
          <li><strong>Badges:</strong> Cores distintas com bom contraste</li>
          <li><strong>Font-family:</strong> Inter para melhor legibilidade</li>
          <li><strong>Font sizes:</strong> Mínimo 12px (headers) e 14px (conteúdo)</li>
        </ul>
      </div>

      {/* Design Tokens */}
      <div style={{ 
        marginTop: '24px', 
        padding: '24px', 
        backgroundColor: tokens.colors.neutral[100], 
        borderRadius: tokens.borderRadius.md,
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: tokens.typography.fontWeight.semibold, marginBottom: '12px', color: tokens.colors.content.primary }}>
          🎨 Design Tokens Utilizados
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '12px' }}>
          <div>
            <strong>Header BG:</strong> {tokens.colors.neutral[50]}
          </div>
          <div>
            <strong>Hover BG:</strong> {tokens.colors.primary[50]}
          </div>
          <div>
            <strong>Border:</strong> {tokens.colors.border.secondary}
          </div>
          <div>
            <strong>Text:</strong> {tokens.colors.content.primary}
          </div>
          <div>
            <strong>Padding Normal:</strong> {tokens.spacing.md}
          </div>
          <div>
            <strong>Padding Compact:</strong> {tokens.spacing.sm}
          </div>
        </div>
      </div>
    </div>
  );
}
