import type React from "react"
import { useParams } from "next/navigation"
import styles from "./Input.module.scss"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
}

const Input: React.FC<InputProps> = ({ label, error, required, className, ...props }) => {
  const params = useParams()
  const isRTL = params.lang === "fa"

  return (
    <div className={styles.inputContainer}>
      {label && (
        <label className={`${styles.label} ${required ? styles.required : ""}  ${isRTL ? styles.isRTL : ""}`} htmlFor={props.id}>
          {label}
        </label>
      )}
      <input className={`${styles.input} ${error ? styles.error : ""} ${className || ""}`} {...props} />
      <span className={`${styles.errorMessage}  ${isRTL ? styles.isRTL : ""}`}>{error??""}</span>
    </div>
  )
}

export default Input
