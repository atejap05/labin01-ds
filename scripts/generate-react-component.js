#!/usr/bin/env node

/**
 * Labin01 Design System — React Component Generator
 * Gera componentes React prontos com suporte a Dark Mode
 *
 * Uso:
 *   node scripts/generate-react-component.js [component-name]
 *   node scripts/generate-react-component.js Button
 *   node scripts/generate-react-component.js Input
 *   node scripts/generate-react-component.js Card
 *
 * Saída:
 *   components/[ComponentName].tsx
 */

const fs = require('fs');
const path = require('path');

const componentName = process.argv[2] || 'Button';
const componentsDir = path.join(__dirname, '../components');

// Criar diretório se não existir
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

const templates = {
  Button: generateButton,
  Input: generateInput,
  Badge: generateBadge,
  Card: generateCard,
  Alert: generateAlert,
  Checkbox: generateCheckbox,
  Radio: generateRadio,
  Select: generateSelect,
};

function generateButton() {
  return `'use client'

import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante de estilo do botão
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'

  /**
   * Tamanho do botão
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Se true, desabilita o botão
   * @default false
   */
  disabled?: boolean

  /**
   * Se true, mostra um loading spinner
   * @default false
   */
  loading?: boolean

  /**
   * Conteúdo do botão
   */
  children: React.ReactNode
}

/**
 * Button Component — Suporta Light & Dark Mode
 *
 * Usa tokens CSS custom properties do Labin01 DS
 * Transições suaves e contraste WCAG AA/AAA
 *
 * @example
 * <Button variant="primary" size="md" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 *
 * @example Dark Mode automático
 * // Em dark mode, cores se adaptam automaticamente via CSS
 * <Button variant="primary">Funciona em ambos os temas</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    // Classes base
    const baseClasses =
      'font-medium rounded-md transition-all duration-200 flex items-center justify-center gap-2'

    // Variantes de cor
    const variantClasses = {
      primary: 'bg-primary-500 text-white hover:opacity-90 active:scale-95 dark:bg-primary-500',
      secondary:
        'bg-primary-50 text-primary-500 hover:bg-primary-100 active:scale-95 dark:bg-primary-100 dark:text-primary-500 dark:hover:bg-primary-200',
      danger: 'bg-danger-500 text-white hover:opacity-90 active:scale-95 dark:bg-danger-500',
      success:
        'bg-success-500 text-white hover:opacity-90 active:scale-95 dark:bg-success-500',
      warning:
        'bg-warning-500 text-black hover:opacity-90 active:scale-95 dark:bg-warning-500 dark:text-white',
    }

    // Tamanhos
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    // Estados disabled
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

    const finalClassName = \`
      \${baseClasses}
      \${variantClasses[variant]}
      \${sizeClasses[size]}
      \${disabledClasses}
      \${className}
    \`.trim()

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={finalClassName}
        {...props}
      >
        {loading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
`;
}

function generateInput() {
  return `'use client'

import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label para o input
   */
  label?: string

  /**
   * Texto de erro
   */
  error?: string

  /**
   * Se true, mostra um asterisco indicando campo obrigatório
   */
  required?: boolean

  /**
   * Tamanho do input
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Input Component — Suporta Light & Dark Mode
 *
 * Usa tokens CSS custom properties do Labin01 DS
 * Suporte completo a acessibilidade (labels, ARIA)
 *
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="seu@email.com"
 *   required
 * />
 *
 * @example Com erro
 * <Input
 *   label="Nome"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 *   error="Nome é obrigatório"
 * />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      required = false,
      size = 'md',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || \`input-\${Math.random().toString(36).substr(2, 9)}\`

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    }

    const baseClasses =
      'w-full border rounded-md font-sans transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0'

    const inputClasses = \`
      \${baseClasses}
      \${sizeClasses[size]}
      \${error ? 'border-danger-500' : 'border-gray-200 dark:border-gray-200'}
      \${className}
    \`.trim()

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-black dark:text-white mb-2">
            {label}
            {required && <span className="text-danger-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? \`\${inputId}-error\` : undefined}
          {...props}
        />
        {error && (
          <p id={\`\${inputId}-error\`} className="text-sm text-danger-500 mt-2">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
`;
}

function generateBadge() {
  return `'use client'

import React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Variante de estilo do badge
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

  /**
   * Tamanho do badge
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Conteúdo do badge
   */
  children: React.ReactNode
}

/**
 * Badge Component — Suporta Light & Dark Mode
 *
 * Usa tokens CSS custom properties do Labin01 DS
 * Compact & acessível com contraste WCAG
 *
 * @example
 * <Badge variant="success">Ativo</Badge>
 * <Badge variant="warning" size="lg">Em destaque</Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-semibold text-center rounded-full'

    const variantClasses = {
      primary:
        'bg-primary-50 text-primary-500 dark:bg-primary-100 dark:text-primary-500',
      secondary:
        'bg-secondary-50 text-secondary-500 dark:bg-secondary-100 dark:text-secondary-500',
      success:
        'bg-success-50 text-success-500 dark:bg-success-100 dark:text-success-500',
      warning:
        'bg-warning-50 text-warning-500 dark:bg-warning-100 dark:text-warning-500',
      danger:
        'bg-danger-50 text-danger-500 dark:bg-danger-100 dark:text-danger-500',
    }

    const sizeClasses = {
      sm: 'px-2 py-1 text-xs h-6 min-w-6',
      md: 'px-3 py-1.5 text-sm h-7 min-w-7',
      lg: 'px-4 py-2 text-base h-8 min-w-8',
    }

    const finalClassName = \`
      \${baseClasses}
      \${variantClasses[variant]}
      \${sizeClasses[size]}
      \${className}
    \`.trim()

    return (
      <span ref={ref} className={finalClassName} {...props}>
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
`;
}

function generateCard() {
  return `'use client'

import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Elevação do card (shadow)
   * @default 'md'
   */
  elevation?: 'sm' | 'md' | 'lg' | 'xl'

  /**
   * Se true, adiciona padding padrão
   * @default true
   */
  padded?: boolean

  /**
   * Conteúdo do card
   */
  children: React.ReactNode
}

/**
 * Card Component — Suporta Light & Dark Mode
 *
 * Container com sombra e estilo consistente
 * Usa tokens CSS custom properties do Labin01 DS
 *
 * @example
 * <Card elevation="lg">
 *   <h3>Título</h3>
 *   <p>Conteúdo do card</p>
 * </Card>
 *
 * @example Header + Body
 * <Card>
 *   <div className="border-b border-gray-200 pb-4">
 *     <h3>Header</h3>
 *   </div>
 *   <p className="pt-4">Corpo do card</p>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      elevation = 'md',
      padded = true,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const elevationClasses = {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    }

    const baseClasses =
      'rounded-lg bg-white dark:bg-gray-100 transition-all duration-200'

    const paddingClasses = padded ? 'p-6' : ''

    const finalClassName = \`
      \${baseClasses}
      \${elevationClasses[elevation]}
      \${paddingClasses}
      \${className}
    \`.trim()

    return (
      <div ref={ref} className={finalClassName} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
`;
}

function generateAlert() {
  return `'use client'

import React from 'react'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tipo/variante do alerta
   * @default 'info'
   */
  type?: 'success' | 'warning' | 'danger' | 'info'

  /**
   * Conteúdo do alerta
   */
  children: React.ReactNode

  /**
   * Callback quando "X" é clicado (opcional)
   */
  onClose?: () => void
}

/**
 * Alert Component — Suporta Light & Dark Mode
 *
 * Alerta com cor semântica e possível dismiss
 * Usa tokens CSS custom properties do Labin01 DS
 *
 * @example
 * <Alert type="success">Operação realizada com sucesso!</Alert>
 * <Alert type="danger" onClose={() => setError(null)}>
 *   Erro ao processar
 * </Alert>
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      type = 'info',
      children,
      onClose,
      className = '',
      ...props
    },
    ref
  ) => {
    const typeClasses = {
      success:
        'bg-success-50 text-success-500 border-l-4 border-l-success-500 dark:bg-success-100',
      warning:
        'bg-warning-50 text-warning-500 border-l-4 border-l-warning-500 dark:bg-warning-100',
      danger:
        'bg-danger-50 text-danger-500 border-l-4 border-l-danger-500 dark:bg-danger-100',
      info: 'bg-primary-50 text-primary-500 border-l-4 border-l-primary-500 dark:bg-primary-100',
    }

    const baseClasses = 'rounded-md p-4 flex items-start justify-between gap-4'

    const finalClassName = \`
      \${baseClasses}
      \${typeClasses[type]}
      \${className}
    \`.trim()

    return (
      <div ref={ref} className={finalClassName} {...props}>
        <div>{children}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-current hover:opacity-70 transition-opacity"
            aria-label="Fechar alerta"
          >
            ✕
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'
`;
}

function generateCheckbox() {
  return `'use client'

import React from 'react'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label para o checkbox
   */
  label?: string

  /**
   * Id do checkbox
   */
  id?: string
}

/**
 * Checkbox Component — Suporta Light & Dark Mode
 *
 * Checkbox customizado com suporte completo à acessibilidade
 * Usa tokens CSS custom properties do Labin01 DS
 *
 * @example
 * <Checkbox label="Concordo com os termos" />
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      id,
      className = '',
      ...props
    },
    ref
  ) => {
    const checkboxId = id || \`checkbox-\${Math.random().toString(36).substr(2, 9)}\`

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={
            'w-4 h-4 rounded border-gray-200 accent-primary-500 cursor-pointer \${className}'
          }
          {...props}
        />
        {label && (
          <label htmlFor={checkboxId} className="text-sm text-black dark:text-white cursor-pointer">
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
`;
}

function generateRadio() {
  return `'use client'

import React from 'react'

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label para o radio
   */
  label?: string

  /**
   * Id do radio
   */
  id?: string
}

/**
 * Radio Component — Suporta Light & Dark Mode
 *
 * Radio button customizado com suporte à acessibilidade
 * Usa tokens CSS custom properties do Labin01 DS
 *
 * @example
 * <Radio name="option" value="1" label="Opção 1" />
 * <Radio name="option" value="2" label="Opção 2" />
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      id,
      className = '',
      ...props
    },
    ref
  ) => {
    const radioId = id || \`radio-\${Math.random().toString(36).substr(2, 9)}\`

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          id={radioId}
          type="radio"
          className={
            'w-4 h-4 border-gray-200 accent-primary-500 cursor-pointer \${className}'
          }
          {...props}
        />
        {label && (
          <label htmlFor={radioId} className="text-sm text-black dark:text-white cursor-pointer">
            {label}
          </label>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'
`;
}

function generateSelect() {
  return `'use client'

import React from 'react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Label para o select
   */
  label?: string

  /**
   * Opções do select
   */
  options?: Array<{ value: string; label: string }>

  /**
   * Texto de erro
   */
  error?: string
}

/**
 * Select Component — Suporta Light & Dark Mode
 *
 * Select customizado com suporte à acessibilidade
 * Usa tokens CSS custom properties do Labin01 DS
 *
 * @example
 * <Select
 *   label="Escolha uma opção"
 *   options={[
 *     { value: '1', label: 'Opção 1' },
 *     { value: '2', label: 'Opção 2' },
 *   ]}
 * />
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options = [],
      error,
      className = '',
      id,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || \`select-\${Math.random().toString(36).substr(2, 9)}\`

    const baseClasses =
      'w-full px-4 py-2 border rounded-md font-sans transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500'

    const selectClasses = \`
      \${baseClasses}
      \${error ? 'border-danger-500' : 'border-gray-200'}
      \${className}
    \`.trim()

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-black dark:text-white mb-2">
            {label}
          </label>
        )}
        <select ref={ref} id={selectId} className={selectClasses} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
        {error && (
          <p className="text-sm text-danger-500 mt-2">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
`;
}

// Buscar qual componente gerar
if (!templates[componentName]) {
  console.error(\`❌ Componente '\${componentName}' não encontrado.\`);
  console.log('\\nComponentes disponíveis:');
  Object.keys(templates).forEach((name) => console.log(\`  - \${name}\`));
  process.exit(1);
}

// Gerar arquivo
const filePath = path.join(componentsDir, \`\${componentName}.tsx\`);
const content = templates[componentName]();

fs.writeFileSync(filePath, content);

console.log(\`✅ Componente gerado: \${filePath}\`);
console.log(\`
📝 Como usar:

  import { \${componentName} } from '@/components/\${componentName}'

  export function MyComponent() {
    return <\${componentName}>Conteúdo<\/\${componentName}>
  }

💡 Dica: Dark mode é automático via tokens CSS do Labin01 DS!
\`);
