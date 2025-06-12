"use client";

import type React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// css
import styles from "./auth.module.scss";
// components
import { Input, Button } from "@/components/ui";
// types
import { IRandomUserResponse } from "@/types/user";
// config
import { HOST_API_KEY } from "../../../config-global";
// utils
import { saveUserToStorage, validatePhone, getUserFromStorage } from "@/utils";

const AuthPage: React.FC = () => {
  const router = useRouter();
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>("");

  useEffect(() => {
    const existingUser = getUserFromStorage();
    if (existingUser) {
      router.push("/dashboard");
    }
  }, [router]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (phoneError) {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneValidationError = validatePhone(phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${HOST_API_KEY}/api/?results=1&nat=us`);

      if (!response.ok) {
        throw new Error("User information not received.");
      }

      const data: IRandomUserResponse = await response.json();

      if (data.results && data.results.length > 0) {
        const user = data.results[0];
        saveUserToStorage(user);
        router.push("/dashboard");
        toast.success("Welcome to the Dashboard!");
      } else {
        throw new Error("User information not received.");
      }
    } catch (error) {
      setPhoneError("Error. Please try again..");
      toast.error("Error. Please try again.!");
    } finally {
      setLoading(false);
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
            className={styles.submitButton}
          >
            {loading ? "submitting..." : "submit"}
          </Button>
        </form>

        <div className={styles.footer}>welcome</div>
      </div>
    </div>
  );
};

export default AuthPage;
