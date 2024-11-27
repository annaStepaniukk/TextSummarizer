import { t } from "i18next"

export enum Language {
    Ukrainian = 'ua',
    English = 'en',
    Germany = 'de'
}

export function getLanguageTranslation(language: Language){
  switch(language){
    case Language.Ukrainian:
      return t("languages.ukrainian");
    case Language.English:
      return t("languages.english");
    case Language.Germany:
      return t("languages.germany");
  }
}