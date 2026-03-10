# 🌙 Dark Mode — Labin01 Design System

Documentação completa para implementação, uso e validação de Dark Mode.

---

## 📚 Índice de Documentação

### 🎯 Começando

| Documento                                                      | Propósito                    | Para quem               |
| -------------------------------------------------------------- | ---------------------------- | ----------------------- |
| **Quick Start** (abaixo)                                       | Integração em 5 minutos      | Desenvolvedores         |
| [`DARK_MODE_IMPLEMENTATION.md`](./DARK_MODE_IMPLEMENTATION.md) | Arquitetura técnica completa | Arquitetos / Tech Leads |
| [`COLOR_MAPPING.json`](./COLOR_MAPPING.json)                   | Matriz de cores light ↔ dark | Designers / Devs        |

### ⚛️ Para Desenvolvedores React

| Documento                                              | Conteúdo                       |
| ------------------------------------------------------ | ------------------------------ |
| [`COMPONENT_GENERATION.md`](./COMPONENT_GENERATION.md) | Como gerar componentes prontos |
| `../app/theme-provider.ts`                             | Provider + hooks para tema     |
| `../app/globals.css`                                   | Tokens CSS com dark mode       |

### ✅ Validação

| Documento                                              | Uso                           |
| ------------------------------------------------------ | ----------------------------- |
| [`VALIDATION_CHECKLIST.md`](./VALIDATION_CHECKLIST.md) | Testar implementação completa |

### 📖 Guias Visuais

| Página            | Acesso                             |
| ----------------- | ---------------------------------- |
| Dark Mode Guide   | `../ds-pages/dark-mode-guide.html` |
| Cores & Contraste | `../ds-pages/colors-schema.html`   |
| Componentes       | `../ds-pages/components.html`      |

---

## 🚀 Quick Start — 5 Minutos

### Pré-requisitos

- Next.js 15+
- React 19+
- Tailwind CSS v4

### 1️⃣ Copiar arquivos

```bash
# Para seu projeto Next.js
cp ../app/globals.css your-project/app/
cp ../app/theme-provider.ts your-project/app/
```

### 2️⃣ Atualizar `app/layout.tsx`

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

### 3️⃣ Usar em componentes

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

### 4️⃣ Pronto! 🎉

Seus componentes se adaptam automaticamente ao dark mode:

```tsx
<button className="bg-primary-500 text-white">
  Funciona em ambos os temas
</button>
```

---

## 📊 Arquitetura em 30 segundos

```
┌─────────────────────┐
│     SO/Navegador    │
│  prefers-color-    │
│      scheme         │
└──────────┬──────────┘
           │
           ▼
    ┌──────────────┐
    │ theme-       │
    │ provider.ts  │
    │ (detecta +   │
    │  salva)      │
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │ CSS Custom   │
    │ Properties   │
    │ (tokens)     │
    │ @media dark  │
    │ + html.dark  │
    └──────┬───────┘
           │
           ▼
┌─────────────────────┐
│   Componentes       │
│   (auto-adapta)     │
│   Button, Input,    │
│   Card, etc         │
└─────────────────────┘
```

---

## 🎨 Cores Principais

| Paleta        | Light   | Dark    | Uso         |
| ------------- | ------- | ------- | ----------- |
| **Primary**   | #1a5a8a | #4a9cd3 | Ações, BTNs |
| **Secondary** | #21a4b8 | #4abfe0 | Destaques   |
| **Success**   | #2f9e44 | #4ac876 | Sucesso ✓   |
| **Warning**   | #f4b940 | #f2c838 | Avisos ⚠    |
| **Danger**    | #dc3244 | #e74c63 | Erros ✕     |

**Detalhes**: Ver `COLOR_MAPPING.json` com todos os 50+ tokens

---

## 📝 Exemplo Completo

### Componente Button com Dark Mode

```tsx
"use client";
import React from "react";

export const Button = React.forwardRef<HTMLButtonElement, any>(
  ({ variant = "primary", children, ...props }, ref) => {
    const variantClasses = {
      primary: "bg-primary-500 text-white dark:bg-primary-500",
      secondary: "bg-primary-50 text-primary-500 dark:bg-primary-100",
    };

    return (
      <button
        ref={ref}
        className={`px-4 py-2 rounded-md ${variantClasses[variant]}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);
```

**Resultado**: Muda de cor automaticamente em dark mode! 🌙

---

## 🔧 Problema Comum: FOUC (Flash of Unstyled Content)

**Problema**: Página pisca com tema incorreto ao carregar.  
**Solução**: `initTheme()` é chamado no ThemeProvider antes de renderizar.

Se ainda tiver problemas, adicione script inline no `<head>`:

```html
<script>
  const theme =
    localStorage.getItem("labin01-theme-preference") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  if (theme === "dark") document.documentElement.classList.add("dark");
</script>
```

---

## ✨ Recursos

### Documentação Técnica

- 📘 [`DARK_MODE_IMPLEMENTATION.md`](./DARK_MODE_IMPLEMENTATION.md) — Arquitetura completa
- 🎨 [`COLOR_MAPPING.json`](./COLOR_MAPPING.json) — Matriz de cores
- 🤖 [`COMPONENT_GENERATION.md`](./COMPONENT_GENERATION.md) — Gerador React

### Testes

- ✅ [`VALIDATION_CHECKLIST.md`](./VALIDATION_CHECKLIST.md) — Checklist de testes

### Visuais

- 🎥 `../ds-pages/dark-mode-guide.html` — Guia com exemplos
- 🎨 `../ds-pages/colors-schema.html` — Paletas de cor
- 🔧 `../ds-pages/components.html` — Componentes em ação

### Código

- 📦 `../app/theme-provider.ts` — Provider + hooks
- 🎯 `../app/globals.css` — Tokens CSS
- ⚙️ `../scripts/generate-react-component.js` — Gerador

---

## 🆘 FAQ Rápido

### P: Como forço light mode em um container?

**R**: Adicione classe `light`:

```tsx
<div className="light">Sempre light mode</div>
```

### P: Dark mode afeta performance?

**R**: Não. CSS custom properties são rápidas. Tailwind v4 otimiza os seletores `:dark`.

### P: Preciso escrever `dark:` em cada classe?

**R**: Não! A maioria funciona automaticamente via tokens.

### P: Posso ter temas customizáveis (não só light/dark)?

**R**: Sim, é future work. Por enquanto, simplifique com light/dark.

### P: Como testo dark mode?

**R**: DevTools → Ctrl+Shift+P → "color scheme" → Select dark

---

## 📋 Checklist de Integração

- [ ] Copiar `theme-provider.ts` e `globals.css`
- [ ] Envolver com `<ThemeProvider>` em `layout.tsx`
- [ ] Usar `useTheme()` em pelo menos 1 componente
- [ ] Testar em light mode
- [ ] Testar em dark mode (DevTools)
- [ ] Testar toggle manual
- [ ] Testar persistência (reload página)
- [ ] Validar contraste WCAG (WebAIM Checker)
- [ ] Verificar em navegadores: Chrome, Firefox, Safari

---

## 🎯 Próximos Passos

1. **Implementar** — Siga o Quick Start acima
2. **Validar** — Use `VALIDATION_CHECKLIST.md`
3. **Customizar** — Estenda componentes conforme necessário
4. **Contribuir** — Feedback é bem-vindo!

---

## 📞 Suporte

- 📖 Dúvidas? Veja [`DARK_MODE_IMPLEMENTATION.md`](./DARK_MODE_IMPLEMENTATION.md)
- 🐛 Bug encontrado? Abra uma issue
- 💡 Sugestão? Envie pull request!

---

**Versão**: 1.0  
**Criado**: 10 de Março de 2026  
**Labin01 — Laboratório de Inovação RF01** 🚀
