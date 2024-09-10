import axios from "axios"

const BASE_URL = "https://api.openweathermap.org/data/2.5/"

export const fetchCurrentWeather = (city: string) =>
  axios.get(
    `${BASE_URL}weather?q=${city}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`,
  )

export const fetchDailyWeather = (city: string) =>
  axios.get(
    `${BASE_URL}forecast?q=${city}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`,
  )
