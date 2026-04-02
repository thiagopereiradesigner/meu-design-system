import type { ButtonHTMLAttributes } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant — usa apenas tokens `var(--ds-*)` no CSS. */
  variant?: ButtonVariant;
}

/**
 * Botão de referência do pacote `@meu-ds/react`.
 * Requer folha de tokens (ex.: `demos/ds-demo-base.css`) carregada na aplicação.
 */
export function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  ...rest
}: ButtonProps) {
  const cls = ['ds-r-btn', `ds-r-btn--${variant}`, className].filter(Boolean).join(' ');
  return <button type={type} className={cls} {...rest} />;
}
