"use client";

import type React from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/Theme";
import styles from "./ThemeToggle.module.scss";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles.themeToggle}>
      {theme === "light" ? (
        <Image
          src="/icon/ic_sun.svg"
          alt="sun"
          className={styles.icon}
          height={20}
          width={20}
        />
      ) : (
        <Image
          src="/icon/ic_moon.svg"
          alt="moon"
          className={styles.icon}
          height={20}
          width={20}
        />
      )}
    </button>
  );
};

export default ThemeToggle;
