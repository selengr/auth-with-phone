"use client"

import type React from "react"
import { useState } from "react"
import styles from "./auth.module.scss"
import { Input, Button } from "@/components/ui"

const AuthPage: React.FC = () => {
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [phoneError, setPhoneError] = useState("")


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    console.log('================>',value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
