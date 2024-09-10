import type { WeatherData } from "../../types/types"
import { convertKelvinToCelsius, convertKelvinToFahrenheit } from "../../utils"
import styles from "./CityWeather.module.css"

interface CityWeatherProps {
  cityName: string
  selectedDayWeather: WeatherData
  degree: "C" | "F"
}

const CityWeather: React.FC<CityWeatherProps> = ({
  cityName,
  selectedDayWeather,
  degree,
}) => {
  return (
    <div className={styles.cityWeather}>
      {selectedDayWeather && (
        <>
          <h1>{cityName}</h1>
          <h2>
            {degree === "C"
              ? `${convertKelvinToCelsius(selectedDayWeather.main.temp)}°C`
              : `${convertKelvinToFahrenheit(selectedDayWeather.main.temp)}°F`}
          </h2>
          <div className={styles.weatherIcon}>
            <img
              src={`https://openweathermap.org/img/wn/${selectedDayWeather.weather[0].icon}.png`}
              alt={selectedDayWeather.weather[0].description}
            />
          </div>
          <p>{selectedDayWeather.weather[0].main}</p>
        </>
      )}
    </div>
  )
}

export default CityWeather
