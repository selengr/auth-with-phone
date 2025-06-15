"use client"

import Image from "next/image"
import type React from "react"
// css
import styles from "../dashboard.module.scss"
// types
import type { IRandomUser } from "@/types/user"
import type { TDictionary } from "@/lib/dictionary-types"

interface HeaderProps {
  dictionary : TDictionary
  user: IRandomUser
  onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, dictionary }) => {

  return (
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
        <div className={styles.logo}>{dictionary.dashboard.index}</div>
      </div>
      <button onClick={onLogout} className={styles.logoutButton}>
        {dictionary.dashboard.sign_out}
      </button>
    </header>
  )
}

export default Header
