import { useEffect, useState } from "react"
import { errorType, forecastType } from "../types"

const useForecast = (
    lat: number | null | undefined,
    lon: number | null | undefined,
    unit: string | null
) => {
    const [forecastData, setForecastData] = useState<forecastType | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [errorForecastMessage, setErrorForecastMessage] =
        useState<errorType | null>(null)

    useEffect(() => {
        setLoading(true)
        if (lat && lon) {
            fetch(
                `${process.env.REACT_APP_WEATHER_API_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.REACT_APP_API_KEY}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setForecastData(data)
                    setLoading(false)
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
            setLoading(false)
        }
    }, [unit, lat, lon])

    return { forecastData, errorForecastMessage, loading }
}

export default useForecast
