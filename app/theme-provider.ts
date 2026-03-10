/**
 * Labin01 Design System — Theme Provider
 * Gerencia detecção automática de tema (prefers-color-scheme) + alternância manual
 *
 * Recursos:
 * - Detecta preferência do SO/navegador ao carregar
 * - Permite alternância manual (toggle)
 * - Persiste preferência em localStorage
 * - Aplica classe `dark` ao elemento html para ativar estilos dark mode
 *
 * Uso:
 * import { initTheme, toggleTheme, getTheme } from './theme-provider'
 *
 * // No app/layout.tsx:
 * useEffect(() => {
 *   initTheme()
 * }, [])
 */

type Theme = 'light' | 'dark';
type ThemeStrategy = 'auto' | 'manual' | 'hybrid';

const THEME_STORAGE_KEY = 'labin01-theme-preference';
const THEME_ATTRIBUTE = 'data-theme';

/**
 * Detecta a preferência do sistema operacional
 */
function detectSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

/**
 * Recupera a preferência salva do usuário
 */
function getSavedTheme(): Theme | null {
  if (typeof window === 'undefined') return null;

  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return (saved === 'dark' || saved === 'light') ? saved : null;
}

/**
 * Salva a preferência do usuário
 */
function saveTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Determina qual tema deve ser usado
 * Ordem de prioridade: preferência salva → preferência do SO → light
 */
function resolveTheme(): Theme {
  const saved = getSavedTheme();
  if (saved) return saved;

  return detectSystemTheme();
}

/**
 * Aplica o tema no DOM
 */
function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;

  if (theme === 'dark') {
    html.classList.add('dark');
    html.setAttribute(THEME_ATTRIBUTE, 'dark');
  } else {
    html.classList.remove('dark');
    html.setAttribute(THEME_ATTRIBUTE, 'light');
  }

  // Notifica listeners via CustomEvent
  window.dispatchEvent(
    new CustomEvent('theme-change', {
      detail: { theme },
    })
  );
}

/**
 * Inicializa o tema na primeira carga
 * Deve ser chamado no app/layout.tsx ou em um useEffect no root component
 */
export function initTheme(): void {
  const theme = resolveTheme();
  applyTheme(theme);
  saveTheme(theme);

  // Monitora mudanças de preferência do SO
  if (typeof window !== 'undefined' && window.matchMedia) {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';

        // Só aplica automaticamente se o usuário não salvou preferência manual
        if (!getSavedTheme()) {
          applyTheme(newTheme);
          saveTheme(newTheme);
        }
      });
  }
}

/**
 * Alterna entre light e dark mode
 * Salva a preferência do usuário
 */
export function toggleTheme(): Theme {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  applyTheme(newTheme);
  saveTheme(newTheme);

  return newTheme;
}

/**
 * Retorna o tema atual
 */
export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const html = document.documentElement;
  return html.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * Hook React para usar tema (requer ThemeProvider)
 * Uso: const { theme, toggleTheme } = useTheme()
 */
export function useThemeHook() {
  const [theme, setTheme] = React.useState<Theme>('light');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setTheme(getTheme());

    const handleThemeChange = (event: CustomEvent<{ theme: Theme }>) => {
      setTheme(event.detail.theme);
    };

    window.addEventListener('theme-change', handleThemeChange as EventListener);

    return () => {
      window.removeEventListener('theme-change', handleThemeChange as EventListener);
    };
  }, []);

  // Evita hydration mismatch
  if (!mounted) {
    return { theme: 'light' as Theme, toggleTheme: () => 'light' as Theme };
  }

  return {
    theme,
    toggleTheme,
  };
}

/**
 * ThemeProvider Context para passar tema para toda a árvore de componentes
 * Uso em app/layout.tsx:
 *
 * export function RootLayout({ children }) {
 *   return (
 *     <html lang="pt-BR">
 *       <body>
 *         <ThemeProvider>
 *           {children}
 *         </ThemeProvider>
 *       </body>
 *     </html>
 *   )
 * }
 */

import React from 'react';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => Theme;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>('light');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    initTheme();
    setMounted(true);
    setTheme(getTheme());

    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ theme: Theme }>;
      setTheme(customEvent.detail.theme);
    };

    window.addEventListener('theme-change', handleThemeChange);
    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
    };
  }, []);

  const handleToggle = () => {
    const newTheme = toggleTheme();
    setTheme(newTheme);
    return newTheme;
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: handleToggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }

  return context;
}
