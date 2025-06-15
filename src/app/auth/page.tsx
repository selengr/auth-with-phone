"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// css
import styles from "./auth.module.scss";
// components
import { Input, Button } from "@/components/ui";
// hooks
import { useAuthSubmit } from "@/hooks/useAuthSubmit";
// utils
import { formatIranianPhone, getUserFromStorage } from "@/utils";

const AuthPage: React.FC = () => {
  const router = useRouter();
  const [phone, setPhone] = useState<string>("");

  const { handleSubmit, loading, error: phoneError, setError: setPhoneError } = useAuthSubmit(phone);

  useEffect(() => {
    const existingUser = getUserFromStorage();
    if (existingUser) {
      router.push("/dashboard");
    }
  }, [router]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formattedPhone = formatIranianPhone(value)
    setPhone(formattedPhone)
    
    if (phoneError) {
      setPhoneError("")
    }
  };


  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Sign in</h1>
        <p className={styles.subtitle}>Enter your phone number</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.phoneInputContainer}>
            <span className={styles.phonePrefix}>98+</span>
            <Input
              id="phone"
              type="tel"
              label="phone number"
              placeholder="912-345-6789"
              value={phone}
              onChange={handlePhoneChange}
              error={phoneError}
              required
              className={styles.phoneInput}
              maxLength={13}
            />
          </div>

          <Button
            type="submit"
            loading={loading}
            fullWidth
            disabled={phone.length === 0}
            className={styles.submitButton}
          >
            {loading ? "...submitting" : "submit"}
          </Button>
        </form>

        <div className={styles.footer}>welcome</div>
      </div>
    </div>
  );
};

export default AuthPage;
