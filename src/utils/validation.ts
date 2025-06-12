export const validatePhone = (phone: string): string | null => {
    const cleanPhone = phone.replace(/\D/g, "")
  
    if (!cleanPhone) {
      return "phone number is required"
    }
  
    const MobilePattern = /^(\+98|0098|98|0)?9[0-9]{9}$/
  
    if (!MobilePattern.test(cleanPhone)) {
      return "phone number is not valid"
    }
  
    return null
  }
  