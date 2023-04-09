import React, { ChangeEvent, FC, useState } from "react"
import Search from "./Search"
import { errorType, optionType } from "../types"
import WeatherOverviewCard from "./WeatherOverviewCard"
import useRandomLocationGenerator from "../hooks/useRandomLocationGenrator"
import useForecast from "../hooks/useForecast"
import Forecast from "./Forecast"

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

    const randomdLocation = useRandomLocationGenerator()

    const { loadingForecast, forecastData } = useForecast(
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
                    humanReadable: "Error",
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
        <main className="h-[100vh] w-full flex flex-col items-center bg-white">
            {forecastData ? (
                <Forecast
                    onBackClick={() => setCity(null)}
                    forecastData={forecastData}
                    loadingForecast={loadingForecast}
                    unit={unit.value}
                    onUnitChange={onUnitChange}
                />
            ) : (
                <>
                    <Search
                        term={searchTerm}
                        options={options}
                        onInputChange={onSearchInputChange}
                        onOptionSelect={onOptionSelect}
                        getUserLocation={getUserLocation}
                        onUnitChange={onUnitChange}
                    >
                        <section className="mt-6">
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
                    </Search>
                </>
            )}

            {errorMessage && (
                <section
                    className="flex flex-col mb-4 mt-4 w-3/4 rounded-lg bg-rose-100 px-6 py-5 text-base font-semibold text-rose-500"
                    role="alert"
                >
                    <div className="font-bold">
                        {errorMessage.humanReadable}
                    </div>
                    <div className="font-thin">{errorMessage.error}</div>
                </section>
            )}
        </main>
    )
}

export default Dashboard
