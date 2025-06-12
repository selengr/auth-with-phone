import type { IRandomUser } from "@/types/user"

const USER_STORAGE_KEY = "authenticated_user"

export const saveUserToStorage = (user: IRandomUser): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  }
}

export const getUserFromStorage = (): IRandomUser | null => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem(USER_STORAGE_KEY)
    return userData ? JSON.parse(userData) : null
  }
  return null
}

export const removeUserFromStorage = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_STORAGE_KEY)
  }
}
