import type { WeatherData } from "../../types/types"
import { convertKelvinToCelsius, convertKelvinToFahrenheit } from "../../utils"
import styles from "./DailyForecast.module.css"

interface DailyForecastProps {
  forecastData: WeatherData[]
  selectedDay: number
  setSelectedDay: (index: number) => void
  degree: "C" | "F"
}

const DailyForecast: React.FC<DailyForecastProps> = ({
  forecastData,
  selectedDay,
  setSelectedDay,
  degree,
}) => {
  return (
    <div className={styles.dailyForecast}>
      {forecastData.map((forecast, index) => (
        <div
          key={index}
          className={`${styles.card} ${selectedDay === index ? styles.active : ""}`}
          onClick={() => setSelectedDay(index)}
        >
          <div className={styles.cardDate}>
            {forecast.dt_txt.split(" ")[0].slice(5, 10)}
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardDegree}>
              {degree === "C"
                ? `${convertKelvinToCelsius(forecast.main.temp)} °C`
                : `${convertKelvinToFahrenheit(forecast.main.temp)} °F`}
            </div>
            <div className={styles.cardIcon}>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DailyForecast
