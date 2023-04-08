import { useEffect, useState } from "react"
import { errorType, forecastType } from "../types"

const useForecast = (
    lat: number | null | undefined,
    lon: number | null | undefined,
    unit: string | null
) => {
    const [forecastData, setForecastData] = useState<forecastType | null>(null)
    const [loadingForecast, setLoadingForecast] = useState<boolean>(false)
    const [errorForecastMessage, setErrorForecastMessage] =
        useState<errorType | null>(null)

    useEffect(() => {
        setLoadingForecast(true)
        if (lat && lon) {
            fetch(
                `${process.env.REACT_APP_WEATHER_API_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.REACT_APP_API_KEY}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setForecastData(data)
                    setLoadingForecast(false)
                })
                .catch((error) =>
                    setErrorForecastMessage({
                        error: error,
                        humanReadable: "Error fetching weather data.",
                    })
                )
        }

        return () => {
            setForecastData(null)
            setErrorForecastMessage(null)
            setLoadingForecast(false)
        }
    }, [unit, lat, lon])

    return { forecastData, errorForecastMessage, loadingForecast }
}

export default useForecast
