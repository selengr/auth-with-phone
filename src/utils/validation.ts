export const validatePhone = (phone: string): string | null => {
  const regex = new RegExp('(0|98|0098|98)?([ ]|-|[()]){0,2}9[0-9]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}');
  
    const result = regex.test(phone);
    if (!result) {
        return "phone number is not valid"
    }

    if (phone.startsWith("0")) {
      return "Phone numbers must not start with zero.";
    }  
  
    return null
  }
  

  export const formatIranianPhone = (phone: string): string => {
    const cleanPhone = phone.replace(/\D/g, "")
  
    if (cleanPhone.length <= 4) return cleanPhone
    if (cleanPhone.length <= 7) return `${cleanPhone.slice(0, 4)}-${cleanPhone.slice(4)}`
    if (cleanPhone.length <= 11) return `${cleanPhone.slice(0, 4)}-${cleanPhone.slice(4, 7)}-${cleanPhone.slice(7)}`
  
    return `${cleanPhone.slice(0, 4)}-${cleanPhone.slice(4, 7)}-${cleanPhone.slice(7, 11)}`
  }
  