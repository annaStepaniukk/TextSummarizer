import { useState } from 'react';
import { Autocomplete, Box, InputAdornment, TextField } from '@mui/material';
import { getLanguageTranslation, Language } from '../enums/languages';
import { useTranslation } from 'react-i18next';

interface Props {
  pageSummary: string | undefined;
  onLanguageChange: (language: Language) => void;
}

export default function TranslationMenu(props: Props) {
  const { t } = useTranslation();
  const { pageSummary, onLanguageChange } = props;

  const [selectedCountry, setSelectedCountry] = useState<Language>(Language.Ukrainian);

  function getFlagIcon(option: Language) {
    return (
      <img
        width="20"
        src={`https://flagcdn.com/w20/${
          option === Language.English ? 'gb' : option.toLowerCase()
        }.png`}
      />
    );
  }

  return (
    <Autocomplete
      fullWidth
      size="small"
      value={selectedCountry}
      disabled={!pageSummary}
      options={Object.values(Language)}
      getOptionLabel={(option: Language) => getLanguageTranslation(option)}
      onChange={(_, newValue) => {
        setSelectedCountry(newValue ?? Language.Ukrainian);
        onLanguageChange(newValue ?? Language.Ukrainian);
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}>
            {getFlagIcon(option)}
            {getLanguageTranslation(option)}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t('languages.label')}
          InputProps={{
            ...params.InputProps,
            startAdornment: selectedCountry ? (
              <InputAdornment position="start">{getFlagIcon(selectedCountry)}</InputAdornment>
            ) : null,
          }}
        />
      )}
    />
  );
}
