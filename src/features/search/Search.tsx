import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import styles from "./Search.module.css"
import { fetchWeatherData, setCity } from "../../app/slices/weatherSlice"

const Search = () => {
  const dispatch = useAppDispatch()
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(value)
  }

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      dispatch(setCity(searchQuery))
      try {
        await dispatch(fetchWeatherData(searchQuery.trim())).unwrap()
      } catch (error) {
        setErrorMessage("City not found. Please try again.")
        setIsModalOpen(true)
      } finally {
        setSearchQuery("")
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setErrorMessage("")
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search City"
      />
      <button onClick={handleSearch}>Search city</button>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>{errorMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
