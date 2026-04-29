import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
  type CountryCode,
} from "libphonenumber-js";

const DEFAULT_COUNTRY: CountryCode = "BR";

export function normalizePhone(input: string, country: CountryCode = DEFAULT_COUNTRY): string | null {
  if (!input) return null;
  try {
    const parsed = parsePhoneNumberWithError(input, country);
    return parsed.format("E.164");
  } catch {
    return null;
  }
}

export function isValidBRPhone(input: string): boolean {
  return isValidPhoneNumber(input, DEFAULT_COUNTRY);
}

export function formatPhoneBR(input: string): string {
  try {
    return parsePhoneNumberWithError(input, DEFAULT_COUNTRY).formatNational();
  } catch {
    return input;
  }
}
