"use client";
// React & Libs
import type React from "react";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// css
import styles from "./auth.module.scss";
// components
import { Input, Button } from "@/components/ui";
// types
import type { TDictionary } from "@/lib/dictionary-types"
// hooks
import { useAuthSubmit } from "@/hooks/useAuthSubmit";
// utils
import { formatIranianPhone, getUserFromStorage } from "@/utils";


interface IProps {
    dictionary: TDictionary
 }
  
  const AuthPage: NextPage<IProps> = ({dictionary}) => {
  const { push } = useRouter();
  
  const [phone, setPhone] = useState<string>("");
  

  const { handleSubmit, loading, error: phoneError, setError: setPhoneError } = useAuthSubmit(phone, dictionary);

  useEffect(() => {
    const existingUser = getUserFromStorage();
    if (existingUser) {
      push(`/dashboard`)
    }
  }, [push]);

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
        <h1 className={styles.title}>{dictionary.auth.sign_in}</h1>
        <p className={styles.subtitle}>{dictionary.auth.enter_phone_number}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.phoneInputContainer}>
            <span className={styles.phonePrefix}>98+</span>
            <Input
              id="phone"
              type="tel"
              label={dictionary.auth.phone_number}
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
            {loading ? dictionary.auth.submitting : dictionary.auth.submit}
          </Button>
        </form>

        <div className={styles.footer}>{dictionary.auth.welcome}</div>
      </div>
    </div>
  );
};

export default AuthPage;
