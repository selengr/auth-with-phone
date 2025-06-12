"use client";

import Image from "next/image";
import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// css
import styles from "./dashboard.module.scss";
// type
import type { IRandomUser } from "@/types/user";
// utils
import { getUserFromStorage, removeUserFromStorage } from "@/utils";

const DashboardPage: React.FC = () => {
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
      <header className={styles.header}>
          <div className={styles.userInfo}>
            <Image
              src={user.picture.medium}
              alt={`${user.name.first} ${user.name.last}`}
              className={styles.avatar}
              height={40}
              width={40}
            />
            <div className={styles.userDetails}>
              <span className={styles.userName}>
                {user.name.title} {user.name.first} {user.name.last}
              </span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          </div>
        <div className={styles.headerContent}>
          <div className={styles.logo}>Dashboard</div>
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sign out
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.welcomeCard}>
          <h1 className={styles.welcomeTitle}>Welcome to the Dashboard!</h1>
          <p className={styles.welcomeMessage}>
          👋🏻😍 Hi {user.name.first}
          </p>

          <div className={styles.userCard}>
            <h2 className={styles.userCardTitle}>profile</h2>
            <div className={styles.userGrid}>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>name</div>
                <div className={styles.fieldValue}>
                  {user.name.title} {user.name.first} {user.name.last}
                </div>
              </div>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>email</div>
                <div className={styles.fieldValue}>{user.email}</div>
              </div>

              <div className={styles.userField}>
                <div className={styles.fieldLabel}>phone</div>
                <div className={styles.fieldValue}>{user.cell}</div>
              </div>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>city</div>
                <div className={styles.fieldValue}>
                  {user.location.city}, {user.location.state}
                </div>
              </div>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>country</div>
                <div className={styles.fieldValue}>{user.location.country}</div>
              </div>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>age</div>
                <div className={styles.fieldValue}>{user.dob.age} سال</div>
              </div>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>username</div>
                <div className={styles.fieldValue}>{user.login.username}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
