import { Box, Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function QuestionsAndAnswers() {
  const { t } = useTranslation();

  return (
    <>
      <Box p={1} display="flex" gap={2}>
        <TextField fullWidth size="small" placeholder={t('questions.askQuestion')} />
        <Button sx={{ color: '#493628' }}>{t('questions.send')}</Button>
      </Box>
    </>
  );
}
