import React, { FC } from "react"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import { forecastType, weatherDataType } from "../types"
import Spinner from "./Spinner"
import Degree from "./Degree"
import {
    getHumidityValue,
    getPop,
    getSunTime,
    getVisibilityValue,
    getWindDirection,
} from "../utils"
import { WiSunrise, WiSunset } from "react-icons/wi"
import Tile from "./Tile"

interface Props {
    onBackClick: () => void
    weatherData: weatherDataType
    forecastData: forecastType
    loadingWeather: boolean
    loadingForecast: boolean
    unit: string | null
}

const Forecast: FC<Props> = ({
    onBackClick,
    weatherData,
    forecastData,
    loadingWeather,
    loadingForecast,
    unit,
}) => {
    if (loadingWeather) return <Spinner>Loading Weather Data</Spinner>

    if (loadingForecast) return <Spinner>Loading Forecast Data</Spinner>

    const unitType = unit === "imperial" ? "F" : unit === "metric" ? "C" : null
    const firstForecastDataListItem = forecastData.list[0]

    return (
        <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
            <button onClick={onBackClick}>
                <FaRegArrowAltCircleLeft size={30} />
            </button>
            <div className="mx-auto w-full">
                <section className="text-center">
                    <h2 className="text-2xl font-black">
                        {weatherData.name}{" "}
                        <span className="font-thin">
                            {forecastData.city.country}
                        </span>
                    </h2>
                    <h1 className="text-4xl font-extrabold">
                        <Degree
                            temp={Math.round(weatherData.main.temp)}
                            unit={unitType}
                        />
                    </h1>
                    <p className="text-sm">
                        {weatherData.weather[0].main} (
                        {weatherData.weather[0].description})
                    </p>
                    <p className="text-sm">
                        H:{" "}
                        <Degree
                            temp={Math.ceil(weatherData.main.temp_max)}
                            unit={unitType}
                        />
                        <span className="ml-4">
                            L:{" "}
                            <Degree
                                temp={Math.floor(weatherData.main.temp_min)}
                                unit={unitType}
                            />
                        </span>
                    </p>
                </section>

                <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
                    {forecastData.list.map((item, i) => (
                        <div
                            key={i}
                            className="inline-block text-center w-[50px] flex-shrink-0"
                        >
                            <p className="text-sm">
                                {i === 0
                                    ? "Now"
                                    : new Date(item.dt * 1000).getHours()}
                            </p>
                            <img
                                alt={`weather-icon-${item.weather[0].description}`}
                                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            />
                            <p className="text-sm font-bold">
                                <Degree
                                    temp={Math.round(item.main.temp)}
                                    unit={unitType}
                                />
                            </p>
                        </div>
                    ))}
                </section>

                <section className="flex flex-wrap justify-between text-zinc-700">
                    <Tile
                        icon="sunrise"
                        title="Sunrise Time"
                        info={getSunTime(weatherData.sys.sunrise)}
                    />

                    <Tile
                        icon="sunset"
                        title="Sunset Time"
                        info={getSunTime(weatherData.sys.sunset)}
                    />

                    <Tile
                        icon="wind"
                        title="Wind"
                        info={`${Math.round(weatherData.wind.speed)} km/h`}
                        description={`${getWindDirection(
                            Math.round(weatherData.wind.deg)
                        )}, gusts 
            ${weatherData.wind.gust.toFixed(1)} km/h`}
                    />
                    <Tile
                        icon="feels"
                        title="Feels like"
                        info={
                            <Degree
                                temp={Math.round(weatherData.main.feels_like)}
                                unit={unitType}
                            />
                        }
                        description={`Feels ${
                            Math.round(weatherData.main.feels_like) <
                            Math.round(weatherData.main.temp)
                                ? "colder"
                                : "warmer"
                        }`}
                    />
                    <Tile
                        icon="humidity"
                        title="Humidity"
                        info={`${weatherData.main.humidity} %`}
                        description={getHumidityValue(
                            weatherData.main.humidity
                        )}
                    />
                    <Tile
                        icon="pop"
                        title="Precipitation"
                        info={`${Math.round(
                            firstForecastDataListItem.pop * 100
                        )}%`}
                        description={`${getPop(
                            firstForecastDataListItem.pop
                        )}, clouds at ${firstForecastDataListItem.clouds.all}%`}
                    />
                    <Tile
                        icon="pressure"
                        title="Pressure"
                        info={`${weatherData.main.pressure} hPa`}
                        description={` ${
                            Math.round(weatherData.main.pressure) < 1013
                                ? "Lower"
                                : "Higher"
                        } than standard`}
                    />
                    <Tile
                        icon="visibility"
                        title="Visibility"
                        info={`${(weatherData.visibility / 1000).toFixed()} km`}
                        description={getVisibilityValue(weatherData.visibility)}
                    />
                </section>
            </div>
        </div>
    )
}

export default Forecast
