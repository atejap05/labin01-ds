# Configuração Tailwind CSS v4 — Labin01 Design System

Configuração para **React 19**, **Next.js 15** e **Tailwind CSS v4**.

## Dependências

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

## Arquivos criados

| Arquivo              | Descrição                                     |
| -------------------- | --------------------------------------------- |
| `postcss.config.mjs` | Configuração PostCSS (Next.js usa por padrão) |
| `app/globals.css`    | Tema Labin01 com `@theme` e tokens            |

## Setup em projeto Next.js 15

### 1. Criar projeto (se novo)

```bash
npx create-next-app@latest meu-projeto --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 2. Atualizar para Tailwind v4

```bash
npm install tailwindcss@latest @tailwindcss/postcss postcss
```

### 3. Substituir `postcss.config.mjs`

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### 4. Substituir `app/globals.css`

Copie o conteúdo de `app/globals.css` deste repositório ou importe o tema:

```css
@import "tailwindcss";
@import "./theme-labin01.css"; /* opcional: tema em arquivo separado */
```

### 5. Fontes (Google Fonts)

Adicione em `app/layout.tsx`:

```tsx
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

## Uso dos tokens

```tsx
// Cores
<div className="bg-primary-500 text-shade-white" />
<div className="bg-success-50 text-success-500" />

// Tipografia
<h1 className="font-heading text-2xl font-bold" />
<p className="font-sans text-base text-gray-700" />
<code className="font-mono text-sm" />

// Spacing
<div className="p-4 gap-2" />

// Radius
<div className="rounded-lg" />

// Shadow
<div className="shadow-md" />
```

## Dark Mode 🌙

Labin01 ds suporta Dark Mode nativo com detecção automática de preferência.

### Setup automático com Tailwind v4

A configuração de dark mode **já está incluída** em `app/globals.css`. Nada extra precisa ser feito no Tailwind!

#### Para components Next.js/React:

**1. Copie `app/theme-provider.ts`** para seu projeto:

```
seu-projeto/app/theme-provider.ts
```

**2. Atualize `app/layout.tsx`**:

```tsx
import { ThemeProvider } from "./theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

**3. Use o hook em componentes**:

```tsx
"use client";
import { useTheme } from "@/app/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
```

**4. Componentes funcionam automaticamente**:

```tsx
// Usa tokens dark modo automaticamente quando dark mode está ativo
<button className="bg-primary-500 text-white">Click me</button>
```

### Recursos

- 📄 **Documentação técnica**: `docs/DARK_MODE_IMPLEMENTATION.md`
- 📊 **Matriz de cores**: `docs/COLOR_MAPPING.json`
- 🎥 **Demonstração visual**: `ds-pages/dark-mode-guide.html` (em breve)

### Boas práticas

✅ **Fazer:**

- Use `dark:` prefix do Tailwind para estilos específicos
- Confie que tokens CSS se adaptam automaticamente
- Teste com `prefers-color-scheme` do browser DevTools

❌ **Evitar:**

- Hardcoded colors (e.g., `backgroundColor: '#1a5a8a'`)
- Filter `invert()` — distorce imagens
- Media queries manuais — Tailwind já lida

## Referência

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Next.js 15 + Tailwind](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css)
- [Labin01 Dark Mode Docs](./docs/DARK_MODE_IMPLEMENTATION.md)
