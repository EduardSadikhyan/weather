import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { toggleDegree } from "../../app/slices/weatherSlice"
import styles from "./Switcher.module.css"

const Switcher = () => {
  const dispatch = useAppDispatch()
  const degree = useAppSelector(state => state.weather.degree)

  const handleToggle = (newDegree: "C" | "F") => {
    dispatch(toggleDegree(newDegree))
  }

  return (
    <div className={styles.toggleContainer}>
      <span
        className={`${styles.toggleOption} ${degree === "C" ? styles.active : ""}`}
        onClick={() => handleToggle("C")}
      >
        °C
      </span>
      <span
        className={`${styles.toggleOption} ${degree === "F" ? styles.active : ""}`}
        onClick={() => handleToggle("F")}
      >
        °F
      </span>
    </div>
  )
}

export default Switcher
