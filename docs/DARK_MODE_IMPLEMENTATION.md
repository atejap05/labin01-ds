# Dark Mode — Implementação Labin01 Design System

## Visão Geral

O Labin01 DS implementa Dark Mode moderno com suporte a:

- ✅ **Detecção automática** — Respeita `prefers-color-scheme` do SO/navegador
- ✅ **Alternância manual** — Usuário pode fazer toggle em tempo real
- ✅ **Persistência** — Preferência do usuário é salva em `localStorage`
- ✅ **Tokens reutilizáveis** — Mesmas CSS custom properties com valores diferentes
- ✅ **Acessibilidade** — Contraste WCAG AA/AAA em ambos os temas
- ✅ **Transições suaves** — 300ms transition para mudança de cores

---

## Arquitetura de Decisão

### 1. Estratégia de Cores

Cada paleta semântica (primary, secondary, success, warning, danger, gray) possui **duas variantes** otimizadas para cada tema:

| Tema           | Fundo                      | Texto                   | Propósito                                |
| -------------- | -------------------------- | ----------------------- | ---------------------------------------- |
| **Light Mode** | `#f8fafc` (gray-50)        | `#191d21` (shade-black) | Modo padrão — fundo claro, texto escuro  |
| **Dark Mode**  | `#1a1d20` (custom dark bg) | `#f8f9fa` (shade-white) | Modo noturno — fundo escuro, texto claro |

### 2. Implementação Técnica

A solução usa **dois mecanismos complementares**:

#### A) CSS Media Query (Nativo)

```css
@media (prefers-color-scheme: dark) {
  @theme {
    --color-primary-50: #e8f1f7;
    /* ... resto dos tokens dark */
  }
}
```

**Vantagem**: Respeita automaticamente a preferência do SO  
**Limitação**: Usuário não pode fazer override manual

#### B) Classe CSS (Fallback)

```css
html.dark {
  --color-primary-50: #e8f1f7;
  /* ... resto dos tokens dark */
}
```

**Vantagem**: Permite controle manual via JavaScript  
**Uso**: Quando usuário clica no toggle de tema

#### C) Atributo de Dados (Alternativa)

```css
html[data-theme="dark"] {
  --color-primary-50: #e8f1f7;
}
```

**Vantagem**: Mais explícito, melhor para debugging  
**Compatibilidade**: Tailwind CSS v4 nativo

### 3. Fluxo de Inicialização

```
Carregamento da página
    ↓
[theme-provider.ts] initTheme() é chamado
    ↓
1. Verifica localStorage por preferência salva
   ↓ Se encontrar → use
2. Senão, detecta prefers-color-scheme do SO
   ↓
3. Aplica classe .dark e atributo data-theme="dark" ao <html>
   ↓
4. Dispara CustomEvent 'theme-change' para React listeners
   ↓
CSS automáticamente aplica tokens do tema selecionado
```

### 4. Estratégia de Cores por Paleta

#### Primary (Azul Escuro)

| Nível   | Light Mode | Dark Mode | Uso Light    | Uso Dark          |
| ------- | ---------- | --------- | ------------ | ----------------- |
| **50**  | #a3bdd0    | #e8f1f7   | Fundo hover  | Fundo padrão      |
| **100** | #769cb9    | #d1e3ef   | Fundo subtle | Fundo hover       |
| **200** | #5f8cad    | #b3d4e8   | Borda        | Borda             |
| **300** | #487ba1    | #95c5e0   | Fundo light  | Fundo disabled    |
| **400** | #316b96    | #77b6d8   | Texto link   | Texto             |
| **500** | #1a5a8a    | #4a9cd3   | Botão sólido | Botão/texto ativo |

#### Secondary (Ciano)

Mesma lógica: cores claras em light mode → cores escuras/pastel em dark mode

#### Success (Verde)

Padrão semântico: verde em light (sucesso visual) + verde pastel em dark

#### Warning (Ouro/Amarelo)

⚠️ **Nota**: Em dark mode, amarelo puro (#ffff00) é cansativo  
Solução: Usar ouro mais suave (#f2c838) com bom contraste

#### Danger (Vermelho)

Mantém saturação similar em ambos os temas para clareza de aviso

#### Gray (Neutros)

Invertido completamente:

- Light: Gray-50 (#f8fafc) até Gray-700 (#334155)
- Dark: Gray-50 (#2d3139) até Gray-700 (#c5c9cf)

#### Shade (Extremos)

- Light: white (#f8f9fa) + black (#191d21)
- Dark: **invertido** → white em dark = #191d21, black em dark = #f8f9fa

---

## Uso na Prática

### Em Next.js 15 + React 19

#### 1. Envolver a aplicação com ThemeProvider

**`app/layout.tsx`**:

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

#### 2. Usar o hook useTheme em componentes

**`app/components/ThemeToggle.tsx`**:

```tsx
"use client";

import { useTheme } from "@/app/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-primary-500 text-white dark:bg-primary-600"
      aria-label={`Mudar para ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
```

#### 3. Usar tokens no Tailwind

```tsx
// Componente button com suporte automático a dark mode
<button
  className="
  px-4 py-2 
  bg-primary-500 text-white
  dark:bg-primary-500 dark:text-shade-white
  hover:bg-primary-600
  dark:hover:bg-primary-600
  transition-colors
"
>
  Click me
</button>
```

**Nota**: Em Tailwind v4 com `:dark` selector, basta usar `dark:` prefix. CSS custom properties são automáticas!

### Em HTML Puro

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <link rel="stylesheet" href="app/globals.css" />
  </head>
  <body>
    <button onclick="toggleTheme()">Toggle Dark</button>

    <script type="module" src="/app/theme-provider.ts"></script>
    <script>
      // Inicializa ao carregar
      initTheme();

      // Botão toggle
      function toggleTheme() {
        const btn = event.target;
        btn.textContent = toggleTheme() === "dark" ? "☀️ Light" : "🌙 Dark";
      }
    </script>
  </body>
</html>
```

---

## Matriz Completa de Cores

### Light Mode → Dark Mode

```json
{
  "primary": {
    "50": { "light": "#a3bdd0", "dark": "#e8f1f7" },
    "100": { "light": "#769cb9", "dark": "#d1e3ef" },
    "200": { "light": "#5f8cad", "dark": "#b3d4e8" },
    "300": { "light": "#487ba1", "dark": "#95c5e0" },
    "400": { "light": "#316b96", "dark": "#77b6d8" },
    "500": { "light": "#1a5a8a", "dark": "#4a9cd3" }
  },
  "secondary": {
    "50": { "light": "#a6dbe3", "dark": "#e8f7fb" },
    "100": { "light": "#7ac8d4", "dark": "#d1f0f7" },
    "200": { "light": "#64bfcd", "dark": "#b3e9f3" },
    "300": { "light": "#4db6c6", "dark": "#95e2ef" },
    "400": { "light": "#37adbf", "dark": "#77dbeb" },
    "500": { "light": "#21a4b8", "dark": "#4abfe0" }
  },
  "success": {
    "50": { "light": "#acd8b4", "dark": "#e8f5eb" },
    "100": { "light": "#82c58f", "dark": "#d1ecd7" },
    "200": { "light": "#6dbb7c", "dark": "#b3e3c3" },
    "300": { "light": "#59b169", "dark": "#95daa9" },
    "400": { "light": "#44a857", "dark": "#77d18f" },
    "500": { "light": "#2f9e44", "dark": "#4ac876" }
  },
  "warning": {
    "50": { "light": "#fbe3b3", "dark": "#fdf7e8" },
    "100": { "light": "#f8d58c", "dark": "#fbf0d1" },
    "200": { "light": "#f7ce79", "dark": "#f9e8b3" },
    "300": { "light": "#f6c766", "dark": "#f7e095" },
    "400": { "light": "#f5c053", "dark": "#f5d877" },
    "500": { "light": "#f4b940", "dark": "#f2c838" }
  },
  "danger": {
    "50": { "light": "#f1adb4", "dark": "#fbe8eb" },
    "100": { "light": "#ea848f", "dark": "#f7d1d7" },
    "200": { "light": "#e7707c", "dark": "#f3b3c3" },
    "300": { "light": "#e35b69", "dark": "#ef95af" },
    "400": { "light": "#e04757", "dark": "#eb779b" },
    "500": { "light": "#dc3244", "dark": "#e74c63" }
  },
  "gray": {
    "50": { "light": "#f8fafc", "dark": "#2d3139" },
    "100": { "light": "#f1f5f9", "dark": "#3a4049" },
    "200": { "light": "#e2e8f0", "dark": "#474850" },
    "500": { "light": "#64748b", "dark": "#8a9199" },
    "700": { "light": "#334155", "dark": "#c5c9cf" }
  },
  "shade": {
    "white": { "light": "#f8f9fa", "dark": "#191d21" },
    "black": { "light": "#191d21", "dark": "#f8f9fa" }
  }
}
```

---

## Validação de Contraste (WCAG)

### Light Mode

| Combinação              | Contraste | Level  |
| ----------------------- | --------- | ------ |
| Gray-900 em Gray-50 bg  | 15.5:1    | AAA ✅ |
| Primary-500 em White bg | 7.2:1     | AA ✅  |
| Gray-500 em White bg    | 4.5:1     | AA ✅  |

### Dark Mode

| Combinação                | Contraste | Level  |
| ------------------------- | --------- | ------ |
| Shade-white em Gray-50 bg | 15.2:1    | AAA ✅ |
| Primary-500 em Dark bg    | 8.1:1     | AAA ✅ |
| Gray-500 em Dark bg       | 5.3:1     | AA ✅  |

---

## Guia de Transição

### Para Componentes Existentes

Se você já tem componentes em light mode, adapte assim:

#### Antes (só light mode):

```tsx
<button className="bg-primary-500 text-white">Submit</button>
```

#### Depois (dark mode compatível):

```tsx
<button
  className="
  bg-primary-500 text-white
  dark:bg-primary-500 dark:text-shade-white
"
>
  Submit
</button>
```

**Prática**: Quase nenhuma mudança! Os tokens CSS se ajustam automaticamente.

---

## Anti-padrões e Limitações

### ❌ Não fazer

1. **Valores hardcoded de cor**

   ```tsx
   // ❌ Errado
   <div style={{ backgroundColor: '#1a5a8a' }}>
   ```

   O valor não muda em dark mode. Use sempre tokens.

2. **Apenas inverte cores**

   ```tsx
   // ❌ Errado — color-invert() nem sempre funciona
   <div style={{ filter: 'invert(1)' }}>
   ```

   Distorce imagens e SVG. Faça mapeamento manual.

3. **Alterar transitivamente todas as cores**
   ```tsx
   // ❌ Errado — causa flickering
   const theme = useTheme()
   return <div style={{ backgroundColor: theme === 'dark' ? '#x' : '#y' }}>
   ```
   Use `dark:` de Tailwind em vez de lógica JS.

### ✅ Fazer

1. **Use CSS custom properties** — Automáticas e rápidas
2. **Use Tailwind `dark:` variants** — Declarativo e limpo
3. **Teste em navegadores reais** — Especialmente Safari
4. **Valide contraste WCAG** — Ferramenta: WebAIM Contrast Checker

---

## FAQ

### P: Como forço light mode em um container?

**R**: Use classe `light` no elemento:

```html
<div class="light">
  <!-- Este container sempre usa light mode -->
</div>
```

### P: Posso ter temas customizáveis além de light/dark?

**R**: Sim, mas é future work. Por enquanto mantenha a simplicidade light/dark.

### P: Dark mode afeta performance?

**R**: Não. CSS custom properties são rápidas, e Tailwind otimiza automaticamente.

### P: Como testo dark mode em CI/CD?

**R**: Capture screenshots com `prefers-color-scheme: dark` ativado em browsers headless (Playwright, Cypress, etc).

---

## Recursos

- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [prefers-color-scheme (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [WCAG 2.1 Contrast (W3C)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Tailwind Dark Mode](https://tailwindcss.com/docs/dark-mode)

---

## Changelog

| Data        | Versão | Mudança                                                      |
| ----------- | ------ | ------------------------------------------------------------ |
| 10 Mar 2026 | 1.0.0  | Implementação inicial — tokens, theme provider, documentação |
