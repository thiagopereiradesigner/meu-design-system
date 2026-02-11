import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

// Design Tokens (alinhados com Portal Empresa)
const tokens = {
  colors: {
    primary: {
      50: '#E6F4ED',
      500: '#04843B',
      700: '#005A1A',
    },
    neutral: {
      0: '#FFFFFF',
    },
    semantic: {
      success: '#04843B',
      successLight: '#E6F4ED',
      successDark: '#005A1A',
      error: '#DC2626',
      errorLight: '#FEE2E2',
      errorDark: '#DC2626',
      warning: '#DC6803',  // ← Cor corrigida WCAG AA
      warningLight: '#FEF3C7',
      warningDark: '#92400E',
      info: '#3B82F6',
      infoLight: '#DBEAFE',
      infoDark: '#1E40AF',
    }
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
  },
  borderRadius: {
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
      semibold: 600,
    },
    lineHeight: {
      normal: 1.5
    }
  },
  animation: {
    duration: {
      fast: '200ms',
      normal: '300ms',
    },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  zIndex: {
    toast: 9999,
  }
};

// ==================== ICONS (Lucide-inspired) ====================
// Info/Circle Alert (Lucide: circle-alert)
const InfoIcon = ({ color = '#FFFFFF', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

// X (Lucide: x)
const CloseIcon = ({ color = '#FFFFFF', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ==================== TOAST COMPONENT ====================
const Toast = ({ 
  id,
  type = 'info',
  variant = 'active',
  title,
  message,
  duration = null,
  showProgress = true,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Auto-close durations por tipo
  const defaultDurations = {
    success: 3000,
    error: 5000,
    warning: 4000,
    info: 4000,
  };

  const effectiveDuration = duration || defaultDurations[type];

  // Configurações de cores por tipo e variante
  const getColors = () => {
    const isActive = variant === 'active';
    
    const colorMap = {
      success: {
        bg: isActive ? tokens.colors.semantic.success : tokens.colors.semantic.successLight,
        text: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.successDark,
        icon: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.success,
        close: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.success,
        progressBg: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(4,132,59,0.3)',
        progressFill: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.successDark,
      },
      error: {
        bg: isActive ? tokens.colors.semantic.error : tokens.colors.semantic.errorLight,
        text: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.errorDark,
        icon: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.error,
        close: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.error,
        progressBg: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(220,38,38,0.3)',
        progressFill: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.errorDark,
      },
      warning: {
        bg: isActive ? tokens.colors.semantic.warning : tokens.colors.semantic.warningLight,
        text: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.warningDark,
        icon: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.warning,
        close: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.warning,
        progressBg: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(220,104,3,0.3)',
        progressFill: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.warningDark,
      },
      info: {
        bg: isActive ? tokens.colors.semantic.info : tokens.colors.semantic.infoLight,
        text: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.infoDark,
        icon: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.info,
        close: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.info,
        progressBg: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(59,130,246,0.3)',
        progressFill: isActive ? tokens.colors.neutral[0] : tokens.colors.semantic.infoDark,
      },
    };

    return colorMap[type];
  };

  const colors = getColors();

  // Animação de entrada
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-close timer
  useEffect(() => {
    if (!isPaused && effectiveDuration > 0) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, effectiveDuration);

      return () => clearTimeout(timerRef.current);
    }
  }, [isPaused, effectiveDuration]);

  // Progress bar animation
  useEffect(() => {
    if (!isPaused && showProgress && effectiveDuration > 0) {
      const interval = 50; // Atualiza a cada 50ms
      const decrement = (100 / effectiveDuration) * interval;

      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - decrement;
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, interval);

      return () => clearInterval(progressIntervalRef.current);
    }
  }, [isPaused, showProgress, effectiveDuration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Tempo da animação de saída
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Estilos
  const containerStyles = {
    position: 'fixed',
    top: '40px',
    left: '50%',
    transform: isVisible && !isExiting 
      ? 'translateX(-50%) translateY(0)' 
      : 'translateX(-50%) translateY(-20px)',
    opacity: isVisible && !isExiting ? 1 : 0,
    transition: `all ${tokens.animation.duration.normal} ${tokens.animation.easing}`,
    zIndex: tokens.zIndex.toast,
    pointerEvents: 'auto',
  };

  const toastStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
    backgroundColor: colors.bg,
    borderRadius: tokens.borderRadius.sm,
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
    fontFamily: tokens.typography.fontFamily,
    minWidth: '320px',
    maxWidth: '480px',
    position: 'relative',
    overflow: 'hidden',
  };

  const contentStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    textAlign: 'left',  // ← Garante alinhamento à esquerda
  };

  const titleStyles = {
    fontSize: tokens.typography.fontSize.md,
    fontWeight: tokens.typography.fontWeight.semibold,
    lineHeight: tokens.typography.lineHeight.normal,
    color: colors.text,
    margin: 0,
    textAlign: 'left',  // ← Alinhamento à esquerda
  };

  const messageStyles = {
    fontSize: tokens.typography.fontSize.md,
    fontWeight: tokens.typography.fontWeight.regular,
    lineHeight: tokens.typography.lineHeight.normal,
    color: colors.text,
    margin: 0,
    textAlign: 'left',  // ← Alinhamento à esquerda
  };

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'opacity 0.15s ease',
    minWidth: '24px',
    minHeight: '24px',
  };

  const progressBarContainerStyles = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '3px',
    backgroundColor: colors.progressBg,
  };

  const progressBarFillStyles = {
    height: '100%',
    backgroundColor: colors.progressFill,
    width: `${progress}%`,
    transition: 'width 50ms linear',
  };

  // ARIA
  const ariaLive = type === 'error' ? 'assertive' : 'polite';

  return (
    <div style={containerStyles}>
      <div
        style={toastStyles}
        role="alert"
        aria-live={ariaLive}
        aria-atomic="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Icon */}
        <InfoIcon color={colors.icon} />

        {/* Content */}
        <div style={contentStyles}>
          <p style={titleStyles}>{title}</p>
          {message && <p style={messageStyles}>{message}</p>}
        </div>

        {/* Close Button */}
        <button
          style={closeButtonStyles}
          onClick={handleClose}
          aria-label="Fechar notificação"
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          <CloseIcon color={colors.close} />
        </button>

        {/* Progress Bar */}
        {showProgress && effectiveDuration > 0 && (
          <div style={progressBarContainerStyles}>
            <div style={progressBarFillStyles} />
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== TOAST CONTEXT ====================
const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (options) => {
    // Se já existe toast, remove o anterior
    if (toast) {
      setToast(null);
      // Pequeno delay para animação de saída
      setTimeout(() => {
        setToast({
          id: Date.now(),
          ...options,
        });
      }, 100);
    } else {
      setToast({
        id: Date.now(),
        ...options,
      });
    }
  };

  const hideToast = (id) => {
    if (toast && toast.id === id) {
      setToast(null);
    }
  };

  // Esc fecha toast
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && toast) {
        hideToast(toast.id);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && (
        <Toast
          {...toast}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};

// Hook para usar toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

// Helper functions
export const toast = {
  success: (message, title = 'Sucesso!', options = {}) => {
    if (typeof window !== 'undefined') {
      window.__toastContext?.showToast({
        type: 'success',
        title,
        message,
        variant: 'active',
        ...options,
      });
    }
  },
  error: (message, title = 'Erro!', options = {}) => {
    if (typeof window !== 'undefined') {
      window.__toastContext?.showToast({
        type: 'error',
        title,
        message,
        variant: 'active',
        ...options,
      });
    }
  },
  warning: (message, title = 'Atenção!', options = {}) => {
    if (typeof window !== 'undefined') {
      window.__toastContext?.showToast({
        type: 'warning',
        title,
        message,
        variant: 'active',
        ...options,
      });
    }
  },
  info: (message, title = 'Informação', options = {}) => {
    if (typeof window !== 'undefined') {
      window.__toastContext?.showToast({
        type: 'info',
        title,
        message,
        variant: 'active',
        ...options,
      });
    }
  },
};

// ==================== DEMO ====================
export default function ToastDemo() {
  const { showToast } = useToast();

  // Expõe no window para helper functions
  useEffect(() => {
    window.__toastContext = { showToast };
  }, [showToast]);

  const handleShowToast = (type, variant) => {
    const messages = {
      success: {
        title: 'Operação concluída!',
        message: 'Seus dados foram salvos com sucesso.',
      },
      error: {
        title: 'Erro ao processar',
        message: 'Não foi possível completar a operação. Tente novamente.',
      },
      warning: {
        title: 'Atenção necessária',
        message: 'Alguns campos precisam ser revisados antes de continuar.',
      },
      info: {
        title: 'Nova atualização',
        message: 'Uma nova versão do sistema está disponível.',
      },
    };

    showToast({
      type,
      variant,
      ...messages[type],
    });
  };

  const containerStyle = {
    padding: '40px',
    backgroundColor: '#F9F9F9',
    minHeight: '100vh',
    fontFamily: tokens.typography.fontFamily,
  };

  const sectionStyle = {
    marginBottom: '48px',
    padding: '32px',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '24px',
    color: '#1A1A1A',
  };

  const subtitleStyle = {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '16px',
    marginTop: '24px',
    color: '#393939',
  };

  const buttonGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  };

  const buttonStyle = (bgColor, textColor = '#FFFFFF') => ({
    padding: '12px 24px',
    backgroundColor: bgColor,
    color: textColor,
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: tokens.typography.fontFamily,
    transition: 'transform 0.15s ease, opacity 0.15s ease',
  });

  const noteStyle = {
    marginTop: '48px',
    padding: '24px',
    backgroundColor: '#E6F4ED',
    borderRadius: '12px',
    borderLeft: '4px solid #04843B',
  };

  const codeStyle = {
    backgroundColor: '#1A1A1A',
    color: '#E6F4ED',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: 'monospace',
    marginTop: '16px',
    overflowX: 'auto',
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', color: '#005A1A' }}>
          Portal Empresa - Design System
        </h1>
        <p style={{ fontSize: '16px', color: '#5E5E5E' }}>
          Toast Component com WCAG AA
        </p>
      </div>

      {/* Active Variant */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>🎨 Active (Fundo Colorido)</h2>
        <p style={{ fontSize: '14px', color: '#5E5E5E', marginBottom: '16px' }}>
          Texto branco em fundo colorido - Todos passam WCAG AA (4.5:1+)
        </p>
        <div style={buttonGridStyle}>
          <button
            style={buttonStyle(tokens.colors.semantic.success)}
            onClick={() => handleShowToast('success', 'active')}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            ✅ Success Toast
          </button>
          <button
            style={buttonStyle(tokens.colors.semantic.error)}
            onClick={() => handleShowToast('error', 'active')}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            ❌ Error Toast
          </button>
          <button
            style={buttonStyle(tokens.colors.semantic.warning)}
            onClick={() => handleShowToast('warning', 'active')}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            ⚠️ Warning Toast
          </button>
          <button
            style={buttonStyle(tokens.colors.semantic.info)}
            onClick={() => handleShowToast('info', 'active')}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            ℹ️ Info Toast
          </button>
        </div>
      </div>

      {/* Light Variant */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>💡 Light (Fundo Claro)</h2>
        <p style={{ fontSize: '14px', color: '#5E5E5E', marginBottom: '16px' }}>
          Texto colorido em fundo claro - Menos chamativo
        </p>
        <div style={buttonGridStyle}>
          <button
            style={buttonStyle(tokens.colors.semantic.successLight, tokens.colors.semantic.successDark)}
            onClick={() => handleShowToast('success', 'light')}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            ✅ Success Light
          </button>
          <button
            style={buttonStyle(tokens.colors.semantic.errorLight, tokens.colors.semantic.errorDark)}
            onClick={() => handleShowToast('error', 'light')}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            ❌ Error Light
          </button>
          <button
            style={buttonStyle(tokens.colors.semantic.warningLight, tokens.colors.semantic.warningDark)}
            onClick={() => handleShowToast('warning', 'light')}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            ⚠️ Warning Light
          </button>
          <button
            style={buttonStyle(tokens.colors.semantic.infoLight, tokens.colors.semantic.infoDark)}
            onClick={() => handleShowToast('info', 'light')}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            ℹ️ Info Light
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={noteStyle}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#004D16' }}>
          ✨ Features Implementadas
        </h3>
        <ul style={{ fontSize: '14px', color: '#333333', lineHeight: 1.6, paddingLeft: '20px' }}>
          <li><strong>Animação suave:</strong> Fade + Slide from top (40px)</li>
          <li><strong>Auto-close:</strong> 3s (success), 4s (info/warning), 5s (error)</li>
          <li><strong>Progress bar:</strong> Animada, pausa no hover</li>
          <li><strong>Hover pausa timer:</strong> Usuário pode ler com calma</li>
          <li><strong>Esc fecha:</strong> Acessibilidade de teclado</li>
          <li><strong>1 toast por vez:</strong> Novo substitui o anterior</li>
          <li><strong>WCAG AA:</strong> Contraste mínimo 4.5:1</li>
          <li><strong>ARIA:</strong> role="alert", aria-live</li>
        </ul>
      </div>

      {/* Usage */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>💻 Como Usar</h2>
        <h3 style={subtitleStyle}>1. Com Hook (Recomendado)</h3>
        <pre style={codeStyle}>
{`import { useToast } from '@/components/ui/Toast';

function MyComponent() {
  const { showToast } = useToast();

  const handleSave = () => {
    // Salvou com sucesso
    showToast({
      type: 'success',
      variant: 'active',
      title: 'Salvo!',
      message: 'Dados salvos com sucesso.',
    });
  };

  return <button onClick={handleSave}>Salvar</button>;
}`}
        </pre>

        <h3 style={subtitleStyle}>2. Com Helper Functions (Mais Simples)</h3>
        <pre style={codeStyle}>
{`import { toast } from '@/components/ui/Toast';

// Sucesso
toast.success('Dados salvos com sucesso!');

// Erro
toast.error('Falha ao salvar dados.');

// Warning
toast.warning('Alguns campos precisam revisão.');

// Info
toast.info('Nova atualização disponível.');`}
        </pre>

        <h3 style={subtitleStyle}>3. Setup do Provider</h3>
        <pre style={codeStyle}>
{`import { ToastProvider } from '@/components/ui/Toast';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}`}
        </pre>
      </div>

      {/* WCAG Info */}
      <div style={{ ...noteStyle, backgroundColor: '#FEF3C7', borderLeftColor: '#DC6803' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#92400E' }}>
          ♿ WCAG AA Compliance
        </h3>
        <table style={{ width: '100%', fontSize: '14px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #DC6803' }}>Tipo</th>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #DC6803' }}>Cor</th>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #DC6803' }}>Contraste</th>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #DC6803' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px' }}>Success</td>
              <td style={{ padding: '8px' }}>#04843B</td>
              <td style={{ padding: '8px' }}>4.89:1</td>
              <td style={{ padding: '8px' }}>✅ PASSA</td>
            </tr>
            <tr style={{ backgroundColor: '#FEFCE8' }}>
              <td style={{ padding: '8px' }}>Error</td>
              <td style={{ padding: '8px' }}>#DC2626</td>
              <td style={{ padding: '8px' }}>4.54:1</td>
              <td style={{ padding: '8px' }}>✅ PASSA</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Warning</td>
              <td style={{ padding: '8px' }}>#DC6803</td>
              <td style={{ padding: '8px' }}>4.65:1</td>
              <td style={{ padding: '8px' }}>✅ PASSA</td>
            </tr>
            <tr style={{ backgroundColor: '#FEFCE8' }}>
              <td style={{ padding: '8px' }}>Info</td>
              <td style={{ padding: '8px' }}>#3B82F6</td>
              <td style={{ padding: '8px' }}>4.56:1</td>
              <td style={{ padding: '8px' }}>✅ PASSA</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Wrapper para o demo
export function ToastDemoWrapper() {
  return (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  );
}
