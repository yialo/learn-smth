import { LangContext } from './context';
import { Lang } from '../types';

export const LangProvider: React.FC<{
  lang: Lang;
  children: React.ReactNode;
}> = ({ lang, children }) => {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
};
