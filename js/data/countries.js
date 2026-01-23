const { getCountries, getCountryCallingCode, AsYouType } =
  window.libphonenumber;

const getFlag = (code) =>
  String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
const getPlaceholder = (countryCode) => {
  const formatter = new AsYouType(countryCode);
  return formatter.input(`+${getCountryCallingCode(countryCode)}1234567890`);
};

export const allCountries = getCountries().map((code) => ({
  code,
  name: code,
  dialCode: `+${getCountryCallingCode(code)}`,
  flag: getFlag(code),

  mask: null,
  placeholder: getPlaceholder(code),
  placeholderValidate: null,
}));
