export const DEFAULT_COUNTRY_CODE = '+52'

export const formatCountryCode = (value: string) => {
  const digits = value.replace(/\D/g, '')
  return digits ? `+${digits}` : ''
}

export const splitPhoneNumber = (value?: string | null) => {
  if (!value) {
    return { countryCode: DEFAULT_COUNTRY_CODE, localNumber: '' }
  }

  const digits = value.replace(/\D/g, '')
  if (!digits) {
    return { countryCode: DEFAULT_COUNTRY_CODE, localNumber: '' }
  }

  if (digits.length <= 10) {
    return { countryCode: DEFAULT_COUNTRY_CODE, localNumber: digits }
  }

  const localNumber = digits.slice(-10)
  const countryCode = `+${digits.slice(0, -10)}`
  return { countryCode, localNumber }
}

export const normalizePhoneParts = (countryCode: string, localNumber: string) => {
  const countryDigits = countryCode.replace(/\D/g, '')
  const localDigits = localNumber.replace(/\D/g, '').slice(0, 10)

  if (!countryDigits && !localDigits) return ''
  return `+${countryDigits}${localDigits}`
}
