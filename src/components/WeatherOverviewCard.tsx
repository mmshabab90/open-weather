import React, { FC, ReactElement } from "react"
import useWeather from "../hooks/useWeather"
import Spinner from "./Spinner"
import { weatherDataType } from "../types"
import Degree from "./Degree"

interface Props {
    lat: number
    lon: number
    unit: string | null
    onCardClick: (e: weatherDataType) => void
}

const WeatherOverviewCard: FC<Props> = ({ lat, lon, unit, onCardClick }) => {
    const { loadingWeather, weatherData, errorWeatherMessage } = useWeather(
        lat,
        lon,
        unit
    )

    if (loadingWeather) {
        return (
            <Container>
                <Spinner>Loading weather data</Spinner>
            </Container>
        )
    }

    if (errorWeatherMessage) {
        return (
            <Container>
                <div className="flex flex-row">
                    <div>
                        <span className="text-bold">Error</span>
                        {errorWeatherMessage.humanReadable}
                    </div>
                    <div>
                        <span className="text-bold">Error</span>
                        {errorWeatherMessage.error}
                    </div>
                </div>
            </Container>
        )
    }

    return (
        weatherData && (
            <section
                className="w-full flex-auto md:w-3/6 xl:w-3/6 h-full p-1 rounded cursor-pointer"
                onClick={() => onCardClick(weatherData)}
            >
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 border rounded shadow-xl p-2">
                    <div className="flex flex-row items-center">
                        <div className="flex-shrink pr-1">
                            <div className="rounded p-3">
                                <img
                                    alt="weather_icon"
                                    src={`${process.env.REACT_APP_WEATHER_API_BASE_URL}/img/w/${weatherData.weather[0].icon}.png`}
                                    width={100}
                                />
                            </div>
                        </div>
                        <div className="flex-1 text-right md:text-center">
                            <h5 className="font-bold uppercase text-gray-500">
                                {weatherData.name}
                            </h5>
                            <h4 className="font-bold text-3xl text-gray-600">
                                {Math.round(weatherData.main.temp)}{" "}
                                {unit === "metric" ? (
                                    <Degree unit="C" />
                                ) : unit === "imperial" ? (
                                    <Degree unit="F" />
                                ) : (
                                    <Degree />
                                )}
                            </h4>
                            <h6 className="font-thin uppercase text-gray-500">
                                {weatherData.weather[0].description}
                            </h6>
                        </div>
                    </div>
                </div>
            </section>
        )
    )
}

const Container: FC<{ children: ReactElement }> = ({ children }) => {
    return (
        <section className="w-full flex-auto md:w-1/3 xl:w-1/3 p-1 rounded">
            {children}
        </section>
    )
}

export default WeatherOverviewCard
