export interface Locale {
  englishName: string;
  nativeName: string;
  rtl?: boolean;
}

const locales: { [lng: string]: Locale } = {
  ar: {
    nativeName: "العربية",
    englishName: "Arabic",
    rtl: true,
  },
  en: {
    nativeName: "English",
    englishName: "English",
  },
  fi: {
    nativeName: "Suomi",
    englishName: "Finnish",
  },
};

export default locales;
