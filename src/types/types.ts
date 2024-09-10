export interface WeatherCondition {
  main: string
  description: string
  icon: string
}

 interface MainWeatherData {
  temp: number
}

export interface WeatherData {
  dt: number
  dt_txt: string
  main: MainWeatherData
  weather: WeatherCondition[]
}

export interface CurrentWeather extends Omit<WeatherData, "dt_txt"> {
  name: string
}

export interface WeatherState {
  currentWeather: CurrentWeather | null
  dailyWeather: WeatherData[]
  selectedDayIndex: number
  city: string
  degree: "C" | "F"
  error: string | null
}

export interface WeatherAPIResponse {
  currentWeather: CurrentWeather
  dailyWeather: WeatherData[]
}
