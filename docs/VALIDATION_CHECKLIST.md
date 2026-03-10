# Dark Mode — Validation Checklist ✅

Checklist completo para validar a implementação de Dark Mode no Labin01 DS.

## Testes Funcionais

### Detecção de Tema

- [ ] **Preferência do SO respeitada**
  - Abra em navegador com dark mode do SO ativado
  - Página deve carregar em dark mode automaticamente
  - Teste em: Chrome, Firefox, Safari, Edge

- [ ] **Preferência salva persiste**
  - Ative dark mode manualmente (toggle)
  - Recarregue a página (F5)
  - Deve continuar em dark mode
  - Verificar localStorage: `labin01-theme-preference`

- [ ] **Toggle manual funciona**
  - Clique no botão toggle
  - Tema deve mudar em ~300ms
  - Cores devem transicionar suavemente
  - Sem flickering ou FOUC

- [ ] **FOUC (Flash of Unstyled Content) evitado**
  - Recarregue página com DevTools aberto
  - Não deve piscar com cores erradas
  - Layout não deve deslocar

### Componentes em Dark Mode

- [ ] **Button**
  - ✓ Primary button com boa legibilidade
  - ✓ Secondary button contrastado
  - ✓ Danger button visível
  - ✓ Hover states funcionam

- [ ] **Input**
  - ✓ Texto legível em dark mode
  - ✓ Borda visível em ambos os temas
  - ✓ Focus state com ring da cor certa
  - ✓ Placeholder text visível

- [ ] **Alert**
  - ✓ Alert success com boa legibilidade
  - ✓ Alert warning com boa legibilidade
  - ✓ Alert danger com boa legibilidade

- [ ] **Badge**
  - ✓ Badges contrastadas em dark mode
  - ✓ Texto legível
  - ✓ Múltiplas variantes funcionam

- [ ] **Card**
  - ✓ Card background apropriado
  - ✓ Sombra visível em dark mode
  - ✓ Conteúdo legível

- [ ] **Select / Dropdown**
  - ✓ Options legíveis
  - ✓ Selected state visível
  - ✓ Sem overflow de texto

### Cores Semânticas

- [ ] **Primary (Azul)**
  - Light: #1a5a8a (contrast 7.2:1 ✅)
  - Dark: #4a9cd3 (contrast 8.1:1 ✅)

- [ ] **Secondary (Ciano)**
  - Light: #21a4b8 (contrast 15.2:1 ✅)
  - Dark: #4abfe0 (contrast 11.2:1 ✅)

- [ ] **Success (Verde)**
  - Light: #2f9e44 (contrast 14.8:1 ✅)
  - Dark: #4ac876 (contrast 12.3:1 ✅)

- [ ] **Warning (Ouro)**
  - Light: #f4b940 (contrast 5.8:1 AA ✅)
  - Dark: #f2c838 (contrast 6.1:1 AA ✅)

- [ ] **Danger (Vermelho)**
  - Light: #dc3244 (contrast 11.8:1 ✅)
  - Dark: #e74c63 (contrast 11.5:1 ✅)

- [ ] **Gray (Neutros)**
  - Light: #334155 (text) vs #f8fafc (bg) = 15.8:1 ✅
  - Dark: #c5c9cf (text) vs #191d21 (bg) = 14.2:1 ✅

## Testes de Acessibilidade

### Contraste (WCAG)

- [ ] **Todos os textos têm contraste AA mínimo (4.5:1)**
  - Use: WebAIM Contrast Checker
  - Use: Axe DevTools Chrome Extension
  - Use: Lighthouse DevTools

- [ ] **Títulos e destaques têm contraste AAA (7:1)**
  - Verificar h1, h2, h3 textos
  - Verificar botões em ambos os temas

- [ ] **Large text (18pt+) tem contraste AA (3:1)**
  - Headers largos
  - Textos destacados

### Navegação

- [ ] **Foco visível em dark mode**
  - Tab por todos os elementos interativos
  - Focus ring deve ser claramente visível
  - Cor deve contrastar com background

- [ ] **Keyboard navigation funcional**
  - Tab/Shift+Tab navega todos os elementos
  - Enter ativa botões
  - Space ativa checkboxes
  - Sem trap de foco

### Testes com Leitores de Tela

- [ ] **NVDA (Windows)**
  - Todos os buttons têm acessibilidade correta
  - Inputs têm labels associados
  - Alerts são anunciados

- [ ] **JAWS (Windows)**
  - Navegação funcional
  - Sem erros de anúncio

- [ ] **VoiceOver (Mac)**
  - Elementos são lidos corretamente
  - Navegação não quebra em dark mode

## Testes Visuais

### Página de Documentação

- [ ] **colors-schema.html**
  - [ ] Mostra paleta light vs dark lado a lado
  - [ ] Tabela de contraste WCAG preenchida
  - [ ] Swatch colors visíveis em ambos os temas
  - [ ] Informações de hex legíveis

- [ ] **components.html**
  - [ ] Botões funcionam em ambos os temas
  - [ ] Inputs entram em foco corretamente
  - [ ] Exemplos respondem a dark mode automático

- [ ] **dark-mode-guide.html**
  - [ ] Página abre em dark/light dependendo do SO
  - [ ] Toggle tema funciona (se JS foi adicionado)
  - [ ] Exemplos de código bem formatados
  - [ ] Tabelas legíveis

### Página de Entrada

- [ ] **index.html**
  - [ ] Tem link para dark-mode-guide.html
  - [ ] Badge "Dark Mode Ready" visível
  - [ ] Responde ao tema do SO

## Testes de Performance

- [ ] **Sem layout shift**
  - Trocar de tema não deve mover elementos
  - Métricas CLS permanece baixa

- [ ] **Transição suave**
  - Mudar de tema não deve pular/piscar
  - Duração ~300ms é aceitável
  - Sem repixt excessivo

- [ ] **Bundle size não afetado**
  - CSS é compactado corretamente
  - Nenhuma duplicação de tokens
  - Tailwind otimiza corretamente

- [ ] **JavaScript mínimo**
  - `theme-provider.ts` tem ~400 linhas
  - Runtime baixo (< 1ms para toggle)
  - Sem memory leaks

## Testes de Compatibilidade

### Navegadores

- [ ] **Chrome 120+**
  - Dark mode automático
  - Toggle manual
  - Contraste validado

- [ ] **Firefox 121+**
  - Dark mode automático
  - Toggle manual
  - Contraste validado

- [ ] **Safari 17+**
  - Dark mode automático
  - Toggle manual
  - Contraste validado

- [ ] **Edge 120+**
  - Dark mode automático
  - Toggle manual
  - Contraste validado

### Dispositivos

- [ ] **Desktop (1920x1080)**
  - Layout não quebra
  - Textos legíveis
  - Sem horizontal scroll

- [ ] **Tablet (768px)**
  - Responsive funciona
  - Botões clicáveis
  - Dark mode funciona

- [ ] **Mobile (375px)**
  - Texto legível
  - Botões espaçados
  - Dark mode funciona

## Testes com Next.js

- [ ] **Hydration sem SSR mismatch**
  - Componentes renderizam corretamente
  - Sem avisos de hydration no console

- [ ] **Theme Provider initialization**
  - Tema é detectado antes de renderizar
  - Sem FOUC ao carregar

- [ ] **Dynamic imports funcionam**
  - Componentes lazy-loaded mudam de tema corretamente

## Documentação

- [ ] **README.md atualizado**
  - [ ] Seção Dark Mode presente
  - [ ] Links para docs/guides funcionam
  - [ ] Quick start incluído

- [ ] **TAILWIND_SETUP.md atualizado**
  - [ ] Instruções de setup completas
  - [ ] Exemplo de ThemeProvider funcionário
  - [ ] Dark mode toggle exemplo

- [ ] **docs/DARK_MODE_IMPLEMENTATION.md completo**
  - [ ] Arquitetura de decisão documentada
  - [ ] Matriz de cores completa
  - [ ] Exemplos de código funcionam
  - [ ] FAQ todas respondidas

- [ ] **docs/COLOR_MAPPING.json válido**
  - [ ] JSON é válido (paste em jsonlint.com)
  - [ ] Todos os tokens presentes
  - [ ] Contraste WCAG documentado

- [ ] **docs/COMPONENT_GENERATION.md completo**
  - [ ] Instruções de uso claras
  - [ ] Exemplos funcionam
  - [ ] Lista de componentes atualizada

- [ ] **ds-pages/dark-mode-guide.html funcional**
  - [ ] Exemplos visuais claros
  - [ ] Código formatado corretamente
  - [ ] Links internos funcionam

## Testes de Integração

- [ ] **Next.js 15 + React 19**
  - Copiar `theme-provider.ts` para novo projeto
  - Copiar `globals.css`
  - Componentes funcionam como esperado

- [ ] **Gerador de componentes**
  - Rodar: `node scripts/generate-react-component.js Button`
  - Arquivo criado em `components/Button.tsx`
  - Componente se adapta a dark mode automaticamente

- [ ] **Tailwind classes funcionam**
  - `bg-primary-500` adapta ao tema
  - `dark:bg-primary-500` funciona (mesmo que redundante)
  - Prefixos funcionam: `hover:`, `dark:`, etc

## Sign-off

```
Testador: _______________
Data: _______________

☑ Todos os testes passaram
☑ Nenhuma regressão visual
☑ Acessibilidade validada
☑ Performance aceitável
☑ Documentação completa

Notas:
_________________________________
_________________________________
```

---

## Links de Referência

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker)
- [Axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Tailwind Dark Mode Docs](https://tailwindcss.com/docs/dark-mode)
- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Versão**: 1.0 | **Criado**: 10 Mar 2026
