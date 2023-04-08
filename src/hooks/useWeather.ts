import { useEffect, useState } from "react"
import { errorType, weatherDataType } from "../types"

const useWeather = (
    lat: number | null,
    lon: number | null,
    unit: string | null
) => {
    const [weatherData, setWeatherData] = useState<weatherDataType | null>(null)
    const [errorWeatherMessage, setErrorWeatherMessage] =
        useState<errorType | null>(null)

    useEffect(() => {
        if (lat && lon) {
            fetch(
                `${process.env.REACT_APP_WEATHER_API_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.REACT_APP_API_KEY}`
            )
                .then((res) => res.json())
                .then((data) => setWeatherData(data))
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
        }
    }, [unit, lat, lon])

    return { weatherData, errorWeatherMessage }
}

export default useWeather
