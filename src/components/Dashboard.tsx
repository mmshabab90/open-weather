import React, { ChangeEvent, FC, useState } from "react"
import Header from "./Header"
import Search from "./Search"
import { errorType, optionType } from "../types"
import useWeather from "../hooks/useWeather"
import WeatherOverviewCard from "./WeatherOverviewCard"
import useRandomLocationGenerator from "../hooks/useRandomLocationGenrator"

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

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)

        if (value.trim() !== "") {
            getSearchOptions(value.trim())
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

        console.log("get forecast")
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
                setCity({
                    name: "User Location",
                    country: "User Country",
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                })
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
        <section className="w-full md:max-w-[1060px] p-4 flex flex-col text-center items-center justify-start md:px-10 h-full lg:h-[800px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
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
            <section className="z-0 w-full md:w-11/12 p-4 leading-normal text-center items-center justify-center md:px-10 h-max lg:h-3/6 bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
                <div className="flex flex-wrap justify-between">
                    {randomdLocation &&
                        randomdLocation.map((l) => (
                            <WeatherOverviewCard
                                key={`${l.id}-${l.zip}`}
                                lat={l.latitude}
                                lon={l.longitude}
                                unit={unit.value}
                                onCardClick={(e) => console.log(e)}
                            />
                        ))}
                </div>
            </section>
        </section>
    )
}

export default Dashboard
