import Switcher from "../../components/switcher/Switcher"
import Search from "../search/Search"
import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.searchContainer}>
        <Search />
      </div>
      <div className={styles.toggleContainer}>
        <Switcher />
      </div>
    </header>
  )
}

export default Header
