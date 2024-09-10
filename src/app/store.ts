import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import weatherReducer from "./slices/weatherSlice"

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
