import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { getSummary } from './api/summary';
import { getWebPageContent } from './utils/getWebPageContent';
import TranslationMenu from './components/TranslationMenu';
import { useTranslation } from 'react-i18next';
import { Language } from './enums/languages';
import './utils/i18n';
import Summary from './components/Summary';
import QuestionsAndAnswers from './components/QuestionsAndAnswers';
import { translateText } from './api/translation';

function App() {
  const [pageContent, setPageContent] = useState<string>();
  const [summary, setSummary] = useState<string>();

  const { i18n } = useTranslation();

  async function changeLanguage(language: Language) {
    i18n.changeLanguage(language);

    const traslatedSummary = await translateText(
      i18n.language as Language,
      language,
      summary ?? '',
    );
    setSummary(traslatedSummary);
  }

  useEffect(() => {
    (async () => {
      const content = await getWebPageContent();
      setPageContent(content);
    })();
  }, []);

  useEffect(() => {
    if (pageContent && pageContent?.length > 0) {
      (async () => {
        const text = await getSummary(pageContent);
        setSummary(text);
      })();
    }
  }, [pageContent]);

  return (
    <Box
      width="600px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%">
      <Box mt={1} mx={1}>
        <TranslationMenu onLanguageChange={(lang) => changeLanguage(lang)} pageSummary={summary} />
        <Summary summary={summary} />
      </Box>
      <QuestionsAndAnswers pageContent={pageContent} />
    </Box>
  );
}

export default App;
