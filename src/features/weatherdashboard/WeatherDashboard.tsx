import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./WeatherDashboard.module.css"
import CityWeather from "../cityweather/CityWeather"
import HourlyForecast from "../hourlyforecast/HourlyForecast"
import DailyForecast from "../dailyforecast/DailyForecast"
import type { WeatherData } from "../../types/types"
import { fetchWeatherData } from "../../app/slices/weatherSlice"
import { currentLocation } from "../../utils"

const WeatherDashboard: React.FC = () => {
  const forecastData = useAppSelector(state => state.weather.dailyWeather)
  const currentWeather = useAppSelector(state => state.weather.currentWeather)
  const degree = useAppSelector(state => state.weather.degree)
  const [selectedDay, setSelectedDay] = useState<number>(0)

  const currentTime = new Date().getHours()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchWeatherData(currentLocation))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const getDailyForecast = (data: WeatherData[]) => {
    const groupedByDay = data.reduce(
      (acc, forecast) => {
        const date = forecast.dt_txt.split(" ")[0]
        if (!acc[date]) acc[date] = []
        acc[date].push(forecast)
        return acc
      },
      {} as Record<string, any[]>,
    )

    const dailyForecast = Object.values(groupedByDay).map(forecasts => {
      return forecasts.reduce((prev, curr) => {
        const currHour = parseInt(curr.dt_txt.split(" ")[1].split(":")[0])
        const prevHour = parseInt(prev.dt_txt.split(" ")[1].split(":")[0])
        return Math.abs(currHour - currentTime) <
          Math.abs(prevHour - currentTime)
          ? curr
          : prev
      })
    })

    return dailyForecast.slice(0, 5)
  }

  const filteredForecast = forecastData ? getDailyForecast(forecastData) : []

  const selectedDayHourlyForecast = forecastData
    ? forecastData.filter(
        forecast =>
          forecast.dt_txt.split(" ")[0] ===
          filteredForecast[selectedDay].dt_txt.split(" ")[0],
      )
    : []

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.topSection}>
        <CityWeather
          cityName={currentWeather?.name as string}
          selectedDayWeather={filteredForecast[selectedDay]}
          degree={degree}
        />
        <HourlyForecast
          hourlyForecast={selectedDayHourlyForecast}
          degree={degree}
        />
      </div>

      <DailyForecast
        forecastData={filteredForecast}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        degree={degree}
      />
    </div>
  )
}

export default WeatherDashboard
