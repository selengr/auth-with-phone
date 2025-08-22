import type { TDictionary } from "@/lib/dictionary-types"
export const validatePhone = (phone: string, dictionary: TDictionary ): string | null => {
  const cleanPhone = phone.replace(/\D/g, "")

  if (cleanPhone.length !== 10) {
    if (cleanPhone.length !== 10) {
      return dictionary.auth.phone_validation_digits
    }
  }

  if (!cleanPhone.startsWith("9")) {
    return dictionary.auth.phone_validation_start_nine
  }

  const regex = /^9[0-9]{9}$/
  if (!regex.test(cleanPhone)) {
    return dictionary.auth.phone_validation_invalid
  }

  return null
}

export const formatIranianPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, "")

  if (cleanPhone.length <= 3) return cleanPhone
  if (cleanPhone.length <= 6) return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3)}`
  if (cleanPhone.length <= 10) return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`

  return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6, 10)}`
}
