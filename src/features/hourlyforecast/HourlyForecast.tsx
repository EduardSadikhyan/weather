import type { WeatherData } from "../../types/types"
import { convertKelvinToCelsius, convertKelvinToFahrenheit } from "../../utils"
import styles from "./HourlyForecast.module.css"

interface HourlyForecastProps {
  hourlyForecast: WeatherData[]
  degree: "C" | "F"
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({
  hourlyForecast,
  degree,
}) => {
  return (
    <div className={styles.hourlyForecast}>
      <ul>
        {hourlyForecast.map(forecast => (
          <li key={forecast.dt}>
            <p>{forecast.dt_txt.split(" ")[1]}</p>
            <p>
              {degree === "C"
                ? `${convertKelvinToCelsius(forecast.main.temp)} °C`
                : `${convertKelvinToFahrenheit(forecast.main.temp)} °F`}
            </p>
            <div className={styles.forecastIcon}>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HourlyForecast
