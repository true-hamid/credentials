export const RegularExperessions = {
  BASIC_USERNAME: '^[a-zA-Z0-9]{5,}$',
  AE_USERNAME: '^[a-zA-Z0-9]{5,}$',
  SD_USERNAME: '^(?=.*[A-Z])[a-zA-Z0-9]{6,}$',
  IN_USERNAME: '^[a-zA-Z][a-zA-Z0-9]{5,}$',
  ALPHABETS_ONLY: '^[a-zA-Z]+$',
  NUMBERS_ONLY: '^[0-9]+$',
  SPECIAL_CHARACTERS: '^[!@#$%]+$',
  AE_PHONE_NUMBER: '^(50|51|52|53|54|55|56|58|59)d{7}$',
  IN_PHONE_NUMBER: '^[789]d{9}$',
  SD_PHONE_NUMBER: '^9d{8}$',
  ALPHANUMERIC_AND_SPECIAL_CHARS: '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*]).{8,}$',
};
