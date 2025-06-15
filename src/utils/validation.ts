export const validatePhone = (phone: string): string | null => {
  const cleanPhone = phone.replace(/\D/g, "")

  if (cleanPhone.length !== 10) {
    return "Phone number must be exactly 10 digits"
  }

  if (!cleanPhone.startsWith("9")) {
    return "Phone number must start with 9"
  }

  const regex = /^9[0-9]{9}$/
  if (!regex.test(cleanPhone)) {
    return "Phone number is not valid"
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
