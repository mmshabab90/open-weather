import React, { ChangeEvent, FC, useState } from "react"
import Search from "./Search"
import { DefaultTemperatureUnit, errorType, optionType } from "../types"
import WeatherOverviewCard from "./WeatherOverviewCard"
import useRandomLocationGenerator, {
    locationData,
} from "../hooks/useRandomLocationGenrator"
import Forecast from "./Forecast"
import Alert from "./Alert"
import useNetwork from "../hooks/useNetwork"

const Dashboard: FC = () => {
    const connectedToInternet = useNetwork()

    const [searchTerm, setSearchTerm] = useState<string>("")
    const [options, setOptions] = useState<optionType[] | []>([])
    const [errorMessage, setErrorMessage] = useState<errorType | null>(null)
    const [city, setCity] = useState<optionType | null>(null)
    const [unit, setUnit] = useState<{
        key: string
        value: string
    }>({
        key: DefaultTemperatureUnit.key,
        value: localStorage.getItem("unit") || DefaultTemperatureUnit.value,
    })

    const randomLocations = useRandomLocationGenerator()

    const resetOptions = () => setOptions([])
    const resetCity = () => setCity(null)

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)

        if (value.trim() !== "") {
            getSearchOptions(value.trim())
        }

        if (value.trim() === "") {
            resetOptions()
            resetCity()
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
        resetOptions()
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
            {city ? (
                <Forecast
                    onBackClick={() => resetCity()}
                    city={city}
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
                                {randomLocations &&
                                    randomLocations.map((l: locationData) => (
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
                    {errorMessage && (
                        <div className="mt-4">
                            <Alert error={errorMessage} color="bg-rose-300" />
                        </div>
                    )}
                </>
            )}

            {!connectedToInternet && (
                <Alert
                    error={{
                        error: "You are not connected to the internet. The app might crash! Once connected to the internet, the alert will go away. Please fresh the browser to access the app.",
                        humanReadable: "Internet Connection Error!",
                    }}
                    color="bg-rose-300"
                />
            )}
        </main>
    )
}

export default Dashboard
