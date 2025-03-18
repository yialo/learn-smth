import { LangContext } from './context';

export const LangProvider: React.FC<{
  lang: string;
  children: React.ReactNode;
}> = ({ lang, children }) => {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
};
