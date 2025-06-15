"use client";
// React & Libs
import type React from "react";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// section
import { Header, Body } from "@/section";
// css
import styles from "../dashboard.module.scss";
// config
import { Locale } from '../../../../i18n.config'
// types
import type { IRandomUser } from "@/types/user";
import type { TDictionary } from "@/lib/dictionary-types"
// utils
import { getUserFromStorage, removeUserFromStorage } from "@/utils";

interface IProps {
    lang : Locale;
    dictionary : TDictionary
 }
  
  const DashboardPage: NextPage<IProps> = ({lang, dictionary}) => {
  const router = useRouter();
  const [user, setUser] = useState<IRandomUser | null>(null);

  useEffect(() => {
    const userData = getUserFromStorage();

    if (!userData) {
      router.push("/auth");
      return;
    }

    setUser(userData);
  }, [router]);

  const handleLogout = () => {
    removeUserFromStorage();
    router.push("/auth");
  };


  if (!user) {
    return <>user not found</>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Header user={user} onLogout={handleLogout} dictionary={dictionary}/> 
      <Body user={user} lang={lang} dictionary={dictionary}/>
    </div>
  );
};

export default DashboardPage;
