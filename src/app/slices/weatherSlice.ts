import axios from "axios"
import type { AxiosError } from "axios"
import type { PayloadAction } from "@reduxjs/toolkit"

import { createAppSlice } from "./createAppSlice"
import { fetchCurrentWeather, fetchDailyWeather } from "../../api/api"
import type { WeatherAPIResponse, WeatherState } from "../../types/types"

const initialState: WeatherState = {
  currentWeather: null,
  dailyWeather: [],
  selectedDayIndex: 0,
  city: "",
  degree: "C",
  error: null,
}

const weatherSlice = createAppSlice({
  name: "weather",
  initialState,
  reducers: create => ({
    setCity: create.reducer<string>((state, { payload }) => {
      state.city = payload
    }),
    setSelectedDayIndex: create.reducer<number>((state, { payload }) => {
      state.selectedDayIndex = payload
    }),
    toggleDegree: create.reducer<"C" | "F">((state, { payload }) => {
      state.degree = payload
    }),

    fetchWeatherData: create.asyncThunk(
      async (city: string, { rejectWithValue }) => {
        try {
          const currentWeather = await fetchCurrentWeather(city)
          const dailyWeather = await fetchDailyWeather(city)
          return {
            currentWeather: currentWeather.data,
            dailyWeather: dailyWeather.data.list,
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(
              err.response?.data?.message || "Something went wrong",
            )
          }
          return rejectWithValue("An unknown error occurred")
        }
      },
      {
        pending: state => {
          state.error = null
        },
        rejected: (state, action) => {
          state.error = action.payload as string
        },
        fulfilled: (state, { payload }: PayloadAction<WeatherAPIResponse>) => {
          state.currentWeather = payload.currentWeather
          state.dailyWeather = payload.dailyWeather
        },
      },
    ),
  }),
})

export const { fetchWeatherData, setCity, toggleDegree } = weatherSlice.actions

export default weatherSlice.reducer
