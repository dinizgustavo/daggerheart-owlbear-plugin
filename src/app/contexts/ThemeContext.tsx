"use client";

import { createContext, useState, useContext } from "react";

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

import type { PropsWithChildren } from "react";

export function ThemeProvider({ children }: PropsWithChildren) {
  const [isDark, setIsDark] = useState(false);

  // Função para trocar o tema
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={isDark ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
}

// 3. Criar um hook personalizado para usar o tema
export function useTheme() {
  return useContext(ThemeContext);
}
