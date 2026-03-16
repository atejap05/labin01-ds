# Direção de Design — Labin01 Design System

Documento de identidade visual para as páginas de documentação (`ds-pages/`), alinhado à skill frontend-design.

---

## 1. Propósito

- **O que**: Design System do Laboratório de Inovação RF01.
- **Para quem**: Desenvolvedores e designers que constroem interfaces para o ecossistema RF01.
- **Problema**: Garantir consistência, acessibilidade e qualidade visual em todas as aplicações.
- **Valores**: Inovação, confiança, clareza, profissionalismo.

---

## 2. Tom Estético

**Direção**: Refinado + Tech

**Adjetivos**: Preciso, técnico, confiável, limpo, memorável.

- **Refinado**: Espaçamento generoso, tipografia cuidada, detalhes sutis. Evitar poluição visual.
- **Tech**: Sensação de produto de software de qualidade — gradientes controlados, sombras definidas, padrões geométricos discretos.

---

## 3. Assinatura Visual

**Elemento memorável**: Gradiente primário–secundário em 135deg + padrão geométrico sutil.

- **Gradiente**: `linear-gradient(135deg, primary-500, secondary-500)` — ângulo fixo em hero, headers e destaques.
- **Padrão de fundo**: Grid de pontos ou linhas diagonais muito sutis (opacity 0.03–0.05) sobre fundo claro, usando primary-500. Cria profundidade sem competir com o conteúdo.
- **Sombra recorrente**: Cards e seções com `box-shadow` usando tokens (shadow-sm, shadow-md); borda inferior em section-title com cor de acento (secondary-500).

---

## 4. Tipografia

| Papel | Fonte | Uso |
|-------|-------|-----|
| **Display** | Sora | Hero, títulos de página, headlines de destaque. Peso 600–800. |
| **Heading** | Plus Jakarta Sans | Títulos de seção, card titles. Mantido do DS. |
| **Body** | Source Sans 3 | Texto corrido, descrições, labels. Substitui Inter na doc. |
| **Mono** | JetBrains Mono | Tokens, código, valores técnicos. Mantido. |

**Fontes (Google Fonts)**:
- Sora: `https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap`
- Plus Jakarta Sans: já em uso
- Source Sans 3: `https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap`
- JetBrains Mono: já em uso

---

## 5. Cor — Dominante vs Acento

- **Dominante**: primary-500 (#1A5A8A) — botões principais, links, bordas de foco, gradiente base.
- **Acento**: secondary-500 (#21A4B8) — section-titles, badges, highlights, gradiente complementar.
- **Neutros**: shade-black (texto), gray-50/100/200 (fundos, bordas). shade-white para texto sobre escuro.
- **Feedback**: success, warning, danger — apenas onde semanticamente necessário.

---

## 6. Restrições

- Manter todos os tokens existentes (cores, spacing, radius, shadow) em `app/globals.css`.
- **app/globals.css** inclui as mesmas fontes (Sora, Source Sans 3) para projetos que consomem o DS — ver `TAILWIND_SETUP.md` e `README.md`.
- Acessibilidade WCAG AA mínimo; contraste e foco visível em todos os estados.
- HTML/CSS puro nas ds-pages; sem dependência de React.
- Logo `logo-labin.png` integrado no hero e header.

---

## 7. Variáveis CSS para ds-pages

```css
--font-display: "Sora", sans-serif;
--font-heading: "Plus Jakarta Sans", sans-serif;
--font-body: "Source Sans 3", sans-serif;
--font-mono: "JetBrains Mono", monospace;

/* Padrão de fundo (SVG ou CSS) */
--bg-pattern: url("data:image/svg+xml,...") ou linear-gradient com repeat;
```

---

## 8. Checklist de Aplicação

- [ ] Hero com logo, gradiente 135deg, tipografia Sora
- [ ] Fundo com profundidade (gradiente sutil ou padrão)
- [ ] Staggered reveal nos cards no load
- [ ] Hover com scale/transição suave nos card-links
- [ ] Design Principles com layout assimétrico (um card em destaque)
- [ ] Header compartilhado em todas as páginas
- [ ] Section-title com borda inferior secondary-500
- [ ] Componentes em contexto (components.html, overlays.html)
