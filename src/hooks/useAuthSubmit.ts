"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// config
import { HOST_API_KEY } from "../../config-global";
// types
import type { IRandomUserResponse } from "@/types/user";
// utils
import { saveUserToStorage, validatePhone } from "@/utils";

export const useAuthSubmit = (phone: string) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if(!phone) return
    
    const phoneValidationError = validatePhone(phone);
    if (phoneValidationError) {
      setError(phoneValidationError);
      return false;
    }

    setLoading(true);
    setError("");

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
        return true;
      } else {
        throw new Error("User information not received.");
      }
    } catch (error) {
      setError(`Error. Please try again.. ${error}`);
      toast.error("Error. Please try again.!");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error, setError };
};