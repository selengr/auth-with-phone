"use client"

import type React from "react"
import { useState, useEffect } from "react"
import styles from "./auth.module.scss"
import { useRouter } from "next/navigation"

import { saveUserToStorage, validatePhone, getUserFromStorage } from "@/utils"
import { Input, Button } from "@/components/ui"
import { IRandomUserResponse } from "@/types/user"

const AuthPage: React.FC = () => {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [phoneError, setPhoneError] = useState("")


  useEffect(() => {
    const existingUser = getUserFromStorage()
    if (existingUser) {
      router.push("/dashboard")
    }
  }, [router])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhone(value)

    if (phoneError) {
      setPhoneError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const phoneValidationError = validatePhone(phone)
    if (phoneValidationError) {
      setPhoneError(phoneValidationError)
      return
    }

    setLoading(true)

    try {
      const response = await fetch("https://randomuser.me/api/?results=1&nat=us")

      if (!response.ok) {
        throw new Error("خطا در دریافت اطلاعات کاربر")
      }

      const data: IRandomUserResponse = await response.json()

      if (data.results && data.results.length > 0) {
        const user = data.results[0]
        saveUserToStorage(user)
        router.push("/dashboard")
      } else {
        throw new Error("اطلاعات کاربر دریافت نشد")
      }
    } catch (error) {
      setPhoneError("خطا در ورود. لطفاً دوباره تلاش کنید.")
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>ورود</h1>
        <p className={styles.subtitle}>برای ورود به داشبورد، شماره تلفن خود را وارد کنید</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.phoneInputContainer}>
            <span className={styles.phonePrefix}>+98</span>
            <Input
              id="phone"
              type="tel"
              label="شماره تلفن"
              placeholder="912-345-6789"
              value={phone}
              onChange={handlePhoneChange}
              error={phoneError}
              required
              className={styles.phoneInput}
              maxLength={13}
            />
          </div>

           <Button type="submit" loading={loading} fullWidth className={styles.submitButton}>
            {loading ? "در حال ورود..." : "ورود"}
          </Button>
        </form>

        <div className={styles.footer}>welcome</div>
      </div>
    </div>
  )
}

export default AuthPage
