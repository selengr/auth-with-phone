"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui"
import { getUserFromStorage, removeUserFromStorage } from "@/utils"
import type { IRandomUser } from "@/types/user"
import styles from "./dashboard.module.scss"

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<IRandomUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = getUserFromStorage()

    if (!userData) {
      router.push("/auth")
      return
    }

    setUser(userData)
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    removeUserFromStorage()
    router.push("/auth")
  }

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "1.125rem",
            color: "#6b7280",
          }}
        >
          در حال بارگذاری...
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>داشبورد</div>
          <div className={styles.userInfo}>
            <img
              src={user.picture.medium || "/placeholder.svg"}
              alt={`${user.name.first} ${user.name.last}`}
              className={styles.avatar}
            />
            <div className={styles.userDetails}>
              <span className={styles.userName}>
                {user.name.title} {user.name.first} {user.name.last}
              </span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
            <Button variant="secondary" onClick={handleLogout} className={styles.logoutButton}>
              خروج
            </Button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.welcomeCard}>
          <h1 className={styles.welcomeTitle}>خوش آمدید به داشبورد!</h1>
          <p className={styles.welcomeMessage}>سلام {user.name.first}، به داشبورد شخصی خود خوش آمدید.</p>

          <div className={styles.userCard}>
            <h2 className={styles.userCardTitle}>اطلاعات کاربری</h2>
            <div className={styles.userGrid}>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>نام کامل</div>
                <div className={styles.fieldValue}>
                  {user.name.title} {user.name.first} {user.name.last}
                </div>
              </div>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>ایمیل</div>
                <div className={styles.fieldValue}>{user.email}</div>
              </div>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>تلفن</div>
                <div className={styles.fieldValue}>{user.phone}</div>
              </div>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>موبایل</div>
                <div className={styles.fieldValue}>{user.cell}</div>
              </div>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>شهر</div>
                <div className={styles.fieldValue}>
                  {user.location.city}, {user.location.state}
                </div>
              </div>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>کشور</div>
                <div className={styles.fieldValue}>{user.location.country}</div>
              </div>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>سن</div>
                <div className={styles.fieldValue}>{user.dob.age} سال</div>
              </div>
              <div className={styles.userField}>
                <div className={styles.fieldLabel}>نام کاربری</div>
                <div className={styles.fieldValue}>{user.login.username}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
