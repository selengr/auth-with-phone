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
// types
import type { IRandomUser } from "@/types/user";
// utils
import { getUserFromStorage, removeUserFromStorage } from "@/utils";

interface IProps {
    lang : any
 }
  
  const DashboardPage: NextPage<IProps> = ({lang}) => {
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
      <Header user={user} onLogout={handleLogout} lang={lang}/> 
      <Body user={user} lang={lang}/>
    </div>
  );
};

export default DashboardPage;
