'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocaleContextType {
  locale: string | undefined;
  setLocale: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{
  children: ReactNode;
  initialLocale: string;
}> = ({ children, initialLocale }) => {
  const [locale, setLocale] = useState<string | undefined>(initialLocale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
