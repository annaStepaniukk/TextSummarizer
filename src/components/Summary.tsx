import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {
  summary: string | undefined;
}

export default function Summary({ summary }: Props) {
  return (
    <Box mt={1} mb={3}>
      {!summary ? (
        <CircularProgress sx={{ color: '#493628' }} />
      ) : (
        <Typography style={{ whiteSpace: 'pre-line', textAlign: 'start' }}>{summary}</Typography>
      )}
    </Box>
  );
}
