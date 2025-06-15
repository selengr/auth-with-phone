import type React from "react"
// css
import styles from "../dashboard.module.scss"
// config
import { Locale } from '../../../../i18n.config'
// types
import type { IRandomUser } from "@/types/user";
import type { TDictionary } from "@/lib/dictionary-types"

interface IProps {
  lang : Locale;
  user: IRandomUser
  dictionary : TDictionary
}

const DashboardBody: React.FC<IProps> = ({ user, lang, dictionary }) => {
  const isRTL = lang === "fa"

  return (
    <main className={styles.main}>
      <div className={styles.welcomeCard}>
        <h1 className={styles.welcomeTitle}>{dictionary.dashboard.welcome_to_dashboard}</h1>
        <p className={styles.welcomeMessage}>
          👋🏻😍 {dictionary.dashboard.hi_user} {user.name.first}
        </p>

        <div className={`${styles.userCard} ${isRTL ? styles.isRTL : ""}`}>
          <h2 className={styles.userCardTitle}>{dictionary.dashboard.profile}</h2>
          <div className={styles.userGrid}>
            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{dictionary.dashboard.name}</div>
              <div className={styles.fieldValue}>
                {user.name.title} {user.name.first} {user.name.last}
              </div>
            </div>
            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{dictionary.dashboard.email}</div>
              <div className={styles.fieldValue}>{user.email}</div>
            </div>

            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{dictionary.dashboard.phone}</div>
              <div className={styles.fieldValue}>{user.cell}</div>
            </div>
            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{dictionary.dashboard.city}</div>
              <div className={styles.fieldValue}>
                {user.location.city}, {user.location.state}
              </div>
            </div>
            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{dictionary.dashboard.country}</div>
              <div className={styles.fieldValue}>{user.location.country}</div>
            </div>
            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{dictionary.dashboard.age}</div>
              <div className={styles.fieldValue}>
                {user.dob.age} {dictionary.dashboard.years_old}
              </div>
            </div>
            <div className={styles.userField}>
              <div className={styles.fieldLabel}>{dictionary.dashboard.username}</div>
              <div className={styles.fieldValue}>{user.login.username}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardBody
