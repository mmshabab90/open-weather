import React, { ChangeEvent, FC, useState } from "react"
import Header from "./Header"
import Search from "./Search"
import { errorType, forecastType, optionType, weatherDataType } from "../types"
import useWeather from "../hooks/useWeather"
import WeatherOverviewCard from "./WeatherOverviewCard"
import useRandomLocationGenerator from "../hooks/useRandomLocationGenrator"
import useForecast from "../hooks/useForecast"
import Forecast from "./Forecast"

interface WeatherAndForecastData {
    weatherData: weatherDataType
    forecastData: forecastType
}

const Dashboard: FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [options, setOptions] = useState<optionType[] | []>([])
    const [errorMessage, setErrorMessage] = useState<errorType | null>(null)
    const [city, setCity] = useState<optionType | null>(null)
    const [unit, setUnit] = useState<{
        key: string | null
        value: string | null
    }>({
        key: "unit",
        value: localStorage.getItem("unit"),
    })
    const [data, setData] = useState<WeatherAndForecastData | null>(null)

    const randomdLocation = useRandomLocationGenerator()
    const { loadingWeather, weatherData, errorWeatherMessage } = useWeather(
        city?.lat,
        city?.lon,
        unit.value
    )
    const { loadingForecast, forecastData, errorForecastMessage } = useForecast(
        city?.lat,
        city?.lon,
        unit.value
    )

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)

        if (value.trim() !== "") {
            getSearchOptions(value.trim())
        }

        if (value.trim() === "") {
            setOptions([])
            setCity(null)
        }
    }

    const getSearchOptions = async (searchTerm: string) => {
        fetch(
            `${process.env.REACT_APP_WEATHER_API_BASE_URL}/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
        )
            .then((res) => res.json())
            .then((data) => setOptions(data))
            .catch((error) =>
                setErrorMessage({
                    error: error,
                    humanReadable: "Error fetching options data.",
                })
            )
    }

    const onOptionSelect = (option: optionType) => {
        setSearchTerm(option.name)
        setCity(option)
        setOptions([])
    }

    const onSubmit = () => {
        if (!city) return
    }

    const setCityData = (
        name: string,
        country: string,
        lat: number,
        lon: number
    ) => {
        setCity({
            name: name,
            country: country,
            lat: lat,
            lon: lon,
        })
    }

    const getUserLocation = () => {
        if (!("geolocation" in navigator)) {
            setErrorMessage({
                error: "Geolocation error!",
                humanReadable: "Browser doesn't support geolocation.",
            })
        }
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setCityData(
                    "",
                    "",
                    position.coords.latitude,
                    position.coords.longitude
                )
                setOptions([])
            },
            function (error) {
                setErrorMessage({
                    error: error.message,
                    humanReadable: "User denied location permission.",
                })
            }
        )
    }

    const onUnitChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? localStorage.setItem("unit", "imperial")
            : localStorage.setItem("unit", "metric")
        e.target.checked
            ? setUnit({ key: "unit", value: "imperial" })
            : setUnit({ key: "unit", value: "metric" })
    }

    return (
        <section className="w-full flex flex-col text-center items-center justify-start md:px-10 h-[100vh] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
            <Header onUnitChange={onUnitChange} />
            <section className="mb-10">
                <Search
                    term={searchTerm}
                    options={options}
                    onInputChange={onSearchInputChange}
                    onOptionSelect={onOptionSelect}
                    onSubmit={onSubmit}
                    getUserLocation={getUserLocation}
                />
            </section>
            {weatherData && forecastData ? (
                <Forecast
                    onBackClick={() => setCity(null)}
                    weatherData={weatherData}
                    forecastData={forecastData}
                    loadingWeather={loadingWeather}
                    loadingForecast={loadingForecast}
                    unit={unit.value}
                />
            ) : (
                <section className="leading-normal text-center items-center justify-center md:px-10 w-full h-full bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
                    <div className="flex flex-wrap justify-between">
                        {randomdLocation &&
                            randomdLocation.map((l) => (
                                <WeatherOverviewCard
                                    key={`${l.id}-${l.zip}`}
                                    lat={l.latitude}
                                    lon={l.longitude}
                                    unit={unit.value}
                                    onCardClick={(e) =>
                                        setCityData(
                                            e.name,
                                            e.name,
                                            e.coord.lat,
                                            e.coord.lon
                                        )
                                    }
                                />
                            ))}
                    </div>
                </section>
            )}
        </section>
    )
}

export default Dashboard
