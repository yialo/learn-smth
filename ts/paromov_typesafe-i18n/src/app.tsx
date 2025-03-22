import { LangProvider, createI18nModule } from './shared/i18n';

const { useI18n } = createI18nModule({
  title: {
    en: 'My title',
    ru: 'Мой заголовок',
  },
  nested: {
    block: {
      en: 'Block',
    },
  },
});

const Consumer: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="consumer">
      <div>
        <div>Simple key: {t('title')}</div>
        <div>Nested key: {t('nested.block')}</div>
      </div>
    </div>
  );
};

export function App() {
  return (
    <LangProvider lang="en">
      <Consumer />
    </LangProvider>
  );
}
