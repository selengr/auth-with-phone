"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// config
import { HOST_API_KEY } from "../../config-global";
// types
import type { IRandomUserResponse } from "@/types/user";
import type { TDictionary } from "@/lib/dictionary-types"
// utils
import { saveUserToStorage, validatePhone } from "@/utils";

export const useAuthSubmit = (phone: string, dictionary: TDictionary) => {
  const { push } = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if(!phone) return
    
    const phoneValidationError = validatePhone(phone, dictionary);
    if (phoneValidationError) {
      setError(phoneValidationError);
      return false;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${HOST_API_KEY}/api/?results=1&nat=us`);

      if (!response.ok) {
        throw new Error(dictionary.auth.user_info_error)
      }

      const data: IRandomUserResponse = await response.json();

      if (data.results && data.results.length > 0) {
        const user = data.results[0];
        saveUserToStorage(user);
        push(`/dashboard`)
        toast.success(dictionary.auth.welcome_dashboard)
        return true;
      } else {
        throw new Error(dictionary.auth.user_info_error)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : dictionary.auth.login_error
      setError(`${dictionary.auth.login_error} ${errorMessage}`)
      toast.error(dictionary.auth.login_error)
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error, setError };
};