export const convertKelvinToCelsius = (tempKelvin: number): number => {
  return Math.round(tempKelvin - 273.15)
}

export const convertKelvinToFahrenheit = (tempKelvin: number): number => {
  return Math.round(((tempKelvin - 273.15) * 9) / 5 + 32)
}

export const currentLocation = Intl.DateTimeFormat()
  .resolvedOptions()
  .timeZone.split("/")[1]
