import { useEffect, useState } from "react"
import { errorType, weatherDataType } from "../types"

const useWeather = (
    lat: number | null | undefined,
    lon: number | null | undefined,
    unit: string | null
) => {
    const [weatherData, setWeatherData] = useState<weatherDataType | null>(null)
    const [loadingWeather, setLoadingWeather] = useState<boolean>(false)
    const [errorWeatherMessage, setErrorWeatherMessage] =
        useState<errorType | null>(null)

    useEffect(() => {
        setLoadingWeather(true)
        if (lat && lon) {
            fetch(
                `${process.env.REACT_APP_WEATHER_API_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.REACT_APP_API_KEY}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setWeatherData(data)
                    setLoadingWeather(false)
                })
                .catch((error) =>
                    setErrorWeatherMessage({
                        error: error,
                        humanReadable: "Error fetching weather data.",
                    })
                )
        }

        return () => {
            setWeatherData(null)
            setErrorWeatherMessage(null)
            setLoadingWeather(false)
        }
    }, [unit, lat, lon])

    return { weatherData, errorWeatherMessage, loadingWeather }
}

export default useWeather
