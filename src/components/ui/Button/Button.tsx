import type React from "react"
import styles from "./Button.module.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  loading?: boolean
  fullWidth?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`
        ${styles.button} 
        ${styles[variant]} 
        ${loading ? styles.loading : ""} 
        ${fullWidth ? styles.fullWidth : ""}
        ${className || ""}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
