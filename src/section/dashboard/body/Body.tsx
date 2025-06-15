import type React from "react"
import { useParams } from "next/navigation"
// css
import styles from "../dashboard.module.scss"
// types
import type { IRandomUser } from "@/types/user"


interface DashboardBodyProps {
  lang: any
  user: IRandomUser
}

const DashboardBody: React.FC<DashboardBodyProps> = ({ user, lang }) => {
  const params = useParams()
  const isRTL = params.lang === "fa"

  return (
    <main className={styles.main}>
      <div className={styles.welcomeCard}>
        <h1 className={styles.welcomeTitle}>{lang.dashboard.welcome_to_dashboard}</h1>
        <p className={styles.welcomeMessage}>
          👋🏻😍 {lang.dashboard.hi_user} {user.name.first}
        </p>

        <div className={`${styles.userCard} ${isRTL ? styles.isRTL : ""}`}>
          <h2 className={styles.userCardTitle}>{lang.dashboard.profile}</h2>
          <div className={styles.userGrid}>
            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{lang.dashboard.name}</div>
              <div className={styles.fieldValue}>
                {user.name.title} {user.name.first} {user.name.last}
              </div>
            </div>
            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{lang.dashboard.email}</div>
              <div className={styles.fieldValue}>{user.email}</div>
            </div>

            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{lang.dashboard.phone}</div>
              <div className={styles.fieldValue}>{user.cell}</div>
            </div>
            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{lang.dashboard.city}</div>
              <div className={styles.fieldValue}>
                {user.location.city}, {user.location.state}
              </div>
            </div>
            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{lang.dashboard.country}</div>
              <div className={styles.fieldValue}>{user.location.country}</div>
            </div>
            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{lang.dashboard.age}</div>
              <div className={styles.fieldValue}>
                {user.dob.age} {lang.dashboard.years_old}
              </div>
            </div>
            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{lang.dashboard.username}</div>
              <div className={styles.fieldValue}>{user.login.username}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardBody
