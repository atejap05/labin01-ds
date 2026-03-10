# Labin01 Design System

Sistema de design para interfaces consistentes, acessíveis e profissionais do **Laboratório de Inovação RF01**.

---

## Visão geral

O Labin01 Design System reúne tokens de cores, tipografia, espaçamento, elevação e componentes UI prontos para uso em projetos React, Next.js e aplicações web. O design prioriza consistência visual, acessibilidade WCAG e modularidade.

---

## Estrutura do projeto

```
labin01-ds/
├── index.html              # Hub principal — página de entrada
├── colors-schema.html      # Paletas de cor, papéis semânticos, WCAG
├── typography.html         # Fontes, escala tipográfica, pesos
├── spacing-elevation.html  # Spacing, border-radius, box-shadow
├── components.html         # Buttons, Inputs, Badges, Cards, Alerts
├── overlays.html           # Modal, Tooltip, Popover, Toast
├── app/
│   └── globals.css         # Tema Labin01 para Tailwind CSS v4
├── postcss.config.mjs      # Config PostCSS (Tailwind v4)
├── TAILWIND_SETUP.md       # Guia de setup Tailwind + Next.js
└── README.md               # Este arquivo
```

---

## Como visualizar a documentação

As páginas são HTML estáticos. Não é necessário instalar dependências para visualizar.

### Opção 1: Abrir diretamente no navegador

Abra qualquer arquivo `.html` no navegador:

```
file:///caminho/para/labin01-ds/index.html
```

### Opção 2: Servidor local (recomendado)

Para evitar problemas de CORS com fontes:

```bash
# Com Node.js (npx)
npx serve .

# Ou com Python
python -m http.server 8080
```

Acesse em `http://localhost:3000` (ou `http://localhost:8080`).

---

## Páginas da documentação

| Página                  | URL                      | Conteúdo                                                                                      |
| ----------------------- | ------------------------ | --------------------------------------------------------------------------------------------- |
| **Hub**                 | `index.html`             | Visão geral, links para foundations e componentes                                             |
| **Colors**              | `colors-schema.html`     | Paletas (Primary, Secondary, Success, Warning, Danger, Shade), papéis semânticos, tabela WCAG |
| **Typography**          | `typography.html`        | Font families, escala de tipos, papéis semânticos                                             |
| **Spacing & Elevation** | `spacing-elevation.html` | Escala 4px, border-radius, box-shadow                                                         |
| **Components**          | `components.html`        | Buttons, Inputs, Badges, Cards, Alerts                                                        |
| **Overlays**            | `overlays.html`          | Modal, Tooltip, Popover, Toast, guidelines                                                    |

---

## Uso em projetos Next.js / React

### 1. Criar projeto Next.js 15

```bash
npx create-next-app@latest meu-projeto --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 2. Instalar Tailwind CSS v4

```bash
cd meu-projeto
npm install tailwindcss@latest @tailwindcss/postcss postcss
```

### 3. Copiar arquivos de configuração

Copie para o seu projeto:

- `postcss.config.mjs` → raiz do projeto

- `app/globals.css` → substitua o conteúdo de `app/globals.css` do seu projeto

### 4. Configurar fontes (opcional)

Em `app/layout.tsx`:

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

Consulte `TAILWIND_SETUP.md` para mais detalhes.

---

## Tokens de design

### Cores

| Token                            | Uso                                |
| -------------------------------- | ---------------------------------- |
| `primary-50` a `primary-500`     | Cor principal (azul institucional) |
| `secondary-50` a `secondary-500` | Cor de destaque (teal)             |
| `success-*`                      | Feedback positivo                  |
| `warning-*`                      | Alertas                            |
| `danger-*`                       | Erros e ações destrutivas          |
| `shade-white` / `shade-black`    | Neutros base                       |

### Tipografia

| Token          | Valor             |
| -------------- | ----------------- |
| `font-heading` | Plus Jakarta Sans |
| `font-sans`    | Inter             |
| `font-mono`    | JetBrains Mono    |

### Classes Tailwind (exemplos)

```tsx
// Cores
<div className="bg-primary-500 text-shade-white" />
<div className="bg-success-50 text-success-500" />

// Tipografia
<h1 className="font-heading text-2xl font-bold" />
<p className="font-sans text-base text-gray-700" />
<code className="font-mono text-sm" />

// Layout
<div className="p-4 gap-2 rounded-lg shadow-md" />
```

---

## Dark Mode 🌙

O Labin01 DS suporta **Dark Mode moderno e eficiente** com detecção automática e alternância manual.

### Suporte Nativo

- ✅ Respota `prefers-color-scheme` do SO/navegador
- ✅ Permite toggle manual (persistido em localStorage)
- ✅ Transições suaves (300ms)
- ✅ Contraste WCAG AA/AAA em ambos os temas
- ✅ Tokens CSS reutilizáveis (sem duplicação)

### Quickstart

#### 1. Envolver com ThemeProvider (Next.js 15)

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/app/theme-provider";

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

#### 2. Usar hook em componentes

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

#### 3. Classes Tailwind automáticas

```tsx
// Em dark mode, usa automaticamente tokens dark (sem código extra!)
<button className="bg-primary-500 text-white dark:bg-primary-500">
  Submit
</button>
```

### Matriz de Cores

Veja o mapeamento completo Light ↔ Dark em:

- 📄 Documentação: `docs/DARK_MODE_IMPLEMENTATION.md`
- 📊 JSON: `docs/COLOR_MAPPING.json`

### Mais Detalhes

Consulte **`docs/DARK_MODE_IMPLEMENTATION.md`** para:

- Arquitetura técnica
- Matriz de todas as cores
- Validação WCAG
- Boas práticas e anti-padrões
- FAQ

---

## Princípios de design

- **Consistência** — Uso uniforme de tokens em todos os componentes
- **Acessibilidade** — Contraste WCAG, foco visível, suporte a teclado
- **Modularidade** — Componentes reutilizáveis e composáveis
- **Clareza** — Hierarquia visual clara e feedback imediato

---

## Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Para uso com Tailwind: Node.js 18+, Next.js 15+, React 19

---

## Licença

Uso interno — Laboratório de Inovação RF01.
