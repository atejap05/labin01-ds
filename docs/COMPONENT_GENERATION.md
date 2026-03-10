# Component Generator — Labin01 Design System

Gera componentes React prontos para produção, com suporte automático a **Dark Mode**.

## Uso Rápido

```bash
# Gerar um componente Button
node scripts/generate-react-component.js Button

# Gerar outros componentes
node scripts/generate-react-component.js Input
node scripts/generate-react-component.js Badge
node scripts/generate-react-component.js Card
node scripts/generate-react-component.js Alert
```

## Componentes Disponíveis

| Componente   | Uso                                                    | Exemplo                                      |
| ------------ | ------------------------------------------------------ | -------------------------------------------- |
| **Button**   | Botões com variantes (primary, secondary, danger, etc) | `<Button variant="primary">Click</Button>`   |
| **Input**    | Campos de texto com labels e validação                 | `<Input label="Email" type="email" />`       |
| **Badge**    | Tags e labels compactos                                | `<Badge variant="success">Ativo</Badge>`     |
| **Card**     | Containers com sombra e estilo                         | `<Card elevation="lg">Conteúdo</Card>`       |
| **Alert**    | Mensagens de alerta e feedback                         | `<Alert type="success">Sucesso!</Alert>`     |
| **Checkbox** | Checkbox customizado                                   | `<Checkbox label="Concordo" />`              |
| **Radio**    | Radio button customizado                               | `<Radio label="Opção 1" />`                  |
| **Select**   | Dropdown customizado                                   | `<Select label="Escolha" options={[...]} />` |

## Como Funciona

### 1. Rodar gerador

```bash
node scripts/generate-react-component.js Button
```

### 2. Arquivo criado em `components/Button.tsx`

```tsx
import { Button } from "@/components/Button";

export function App() {
  return (
    <Button variant="primary" onClick={() => alert("Clicked!")}>
      Click me
    </Button>
  );
}
```

### 3. Dark Mode é automático! 🌙

```tsx
// Nenhuma configuração necessária
// Componente se adapta automaticamente ao tema ativo
<Button>Funciona em light e dark mode</Button>
```

## Características

- ✅ **TypeScript** — Tipos completos para todas as props
- ✅ **Acessibilidade** — ARIA labels, semantic HTML, keyboard support
- ✅ **Dark Mode** — 100% compatível, cores automáticas via tokens CSS
- ✅ **Tailwind v4** — Classes padrão de Tailwind
- ✅ **React 19** — Suporte a `forwardRef` e React 19 features
- ✅ **Customizável** — Props extensíveis via `React.HTMLAttributes`
- ✅ **Sem dependências externas** — Apenas React e Tailwind

## Estrutura de um Componente Gerado

```tsx
"use client";

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Props customizadas
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

/**
 * Button Component — Suporta Light & Dark Mode
 *
 * Usa tokens CSS custom properties do Labin01 DS
 * Transições suaves e contraste WCAG AA/AAA
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", disabled = false, children, ...props },
    ref,
  ) => {
    // Classes base
    const baseClasses = "...";

    // Variantes de cor (com dark: prefixes automáticos)
    const variantClasses = {
      primary: "bg-primary-500 text-white dark:bg-primary-500",
      // ...
    };

    return (
      <button ref={ref} className={finalClassName} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
```

## Tokens CSS Automáticos

Cada componente usa tokens CSS custom properties do Labin01 DS:

```css
/* Light Mode */
--color-primary-500: #1a5a8a --color-gray-50: #f8fafc
  /* Dark Mode (automático via @media prefers-color-scheme: dark) */
  --color-primary-500: #4a9cd3 --color-gray-50: #2d3139;
```

**Resultado**: Componentes se adaptam magicamente ao tema! ✨

## Customizando Componentes Gerados

Você pode estender os componentes gerados:

```tsx
// components/CustomButton.tsx
import { Button, ButtonProps } from "@/components/Button";

export function CustomButton(props: ButtonProps) {
  return <Button {...props} className={`${props.className} my-custom-class`} />;
}
```

## Boas Práticas

### ✅ Fazer

```tsx
// Usar tokens CSS para cores
<Button variant="primary">Correto</Button>

// Estender props via spread
<Button {...customProps}>Compatível</Button>

// Usar dark: prefix para estilos específicos
<div className="bg-primary-500 dark:bg-primary-500">
```

### ❌ Evitar

```tsx
// Hardcoded colors
<div style={{ backgroundColor: '#1a5a8a' }}>Errado</div>

// Forçar light mode (quebrará dark mode)
<div className="light bg-white">Quebrado</div>

// Media queries manuais (Tailwind já trata)
<div style={{ '@media (prefers-color-scheme: dark)': {...} }}>
```

## Adicionando Novos Componentes

Para adicionar um novo componente ao gerador:

1. Abra `scripts/generate-react-component.js`
2. Adicione uma função `generateYourComponent()`
3. Adicione à const `templates`:

```javascript
const templates = {
  Button: generateButton,
  YourComponent: generateYourComponent, // ← novo
};

function generateYourComponent() {
  return `'use client'
  
import React from 'react'

export interface YourComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const YourComponent = React.forwardRef<HTMLDivElement, YourComponentProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>{children}</div>
  )
)

YourComponent.displayName = 'YourComponent'
  `;
}
```

4. Rode: `node scripts/generate-react-component.js YourComponent`

## Package.json Scripts (Opcional)

Adicione ao seu `package.json`:

```json
{
  "scripts": {
    "gen:button": "node scripts/generate-react-component.js Button",
    "gen:input": "node scripts/generate-react-component.js Input",
    "gen:all": "npm run gen:button && npm run gen:input && npm run gen:badge && npm run gen:card"
  }
}
```

Então use:

```bash
npm run gen:button
npm run gen:all
```

## Troubleshooting

### P: Componente não foi criado

- Vérifique se a pasta `components/` existe
- Rode: `mkdir -p components`
- Tente novamente

### P: Erro "Cannot find module"

- Verifique que você está no diretório raiz do projeto
- Rode: `node scripts/generate-react-component.js Button`

### P: TypeScript errors

- Garanta que `tsconfig.json` está configurado para React 19
- Use `React.forwardRef` como nos templates

### P: Dark mode não funciona

- Verifique que `app/globals.css` está importado
- Confirme que `@theme` está definido em `globals.css`
- Teste em modo dark do navegador (DevTools)

## Referência

- 📘 [Dark Mode Implementation](./DARK_MODE_IMPLEMENTATION.md)
- 🎨 [Color Mapping](./COLOR_MAPPING.json)
- 📦 [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- ⚛️ [React 19 Docs](https://react.dev)
