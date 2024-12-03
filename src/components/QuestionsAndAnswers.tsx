import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAnswer } from '../api/questionAnswering';

const MessageBubble = ({ text, isSender }: { text: string; isSender: boolean }) => {
  return (
    <Box display="flex" justifyContent={isSender ? 'flex-end' : 'flex-start'} my={1}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: '70%',
          p: 1,
          borderRadius: 2,
          backgroundColor: isSender ? '#493628' : '#D6C0B3',
          color: isSender ? '#ffffff' : '#000000',
          borderTopRightRadius: isSender ? 0 : 16,
          borderTopLeftRadius: isSender ? 16 : 0,
        }}>
        <Typography>{text}</Typography>
      </Paper>
    </Box>
  );
};

interface QuestionAnswer {
  text: string;
  isSender: boolean;
}

export default function QuestionsAndAnswers({ pageContent }: { pageContent: string | undefined }) {
  const { t } = useTranslation();

  const [questionHistory, setQuestionHistory] = useState<QuestionAnswer[]>([]);
  const [currentMessageText, setCurrentMessageText] = useState<string>('');

  async function handleSendMessage() {
    setQuestionHistory((prev) => [...prev, { text: currentMessageText, isSender: true }]);
    const answer = await getAnswer(currentMessageText, pageContent ?? '');
    setQuestionHistory((prev) => [...prev, { text: answer, isSender: false }]);
    setCurrentMessageText('');
  }

  return (
    <>
      {questionHistory.map((q) => (
        <MessageBubble text={q.text} isSender={q.isSender} />
      ))}
      <Box p={1} display="flex" gap={2}>
        <TextField
          fullWidth
          size="small"
          placeholder={t('questions.askQuestion')}
          value={currentMessageText}
          onChange={(e) => setCurrentMessageText(e.target.value)}
        />
        <Button sx={{ color: '#493628' }} onClick={handleSendMessage}>
          {t('questions.send')}
        </Button>
      </Box>
    </>
  );
}
