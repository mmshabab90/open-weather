import { useEffect, useState } from "react"
import { errorType, weatherDataType } from "../types"

const useWeather = (
    lat: number | null | undefined,
    lon: number | null | undefined,
    unit: string | null
) => {
    const [weatherData, setWeatherData] = useState<weatherDataType | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [errorWeatherMessage, setErrorWeatherMessage] =
        useState<errorType | null>(null)

    useEffect(() => {
        setLoading(true)
        if (lat && lon) {
            fetch(
                `${process.env.REACT_APP_WEATHER_API_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.REACT_APP_API_KEY}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setWeatherData(data)
                    setLoading(false)
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
            setLoading(false)
        }
    }, [unit, lat, lon])

    return { weatherData, errorWeatherMessage, loading }
}

export default useWeather
