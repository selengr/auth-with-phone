"use client"

import type React from "react"
import { Button } from "@/components/ui"


import styles from "./dashboard.module.scss"

const DashboardPage: React.FC = () => {



  const handleLogout = () => {

  }


  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
         
            <Button variant="secondary" onClick={handleLogout} className={styles.logoutButton}>
              خروج
            </Button>
       
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.welcomeCard}>
          <h1 className={styles.welcomeTitle}>خوش آمدید به داشبورد!</h1>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
