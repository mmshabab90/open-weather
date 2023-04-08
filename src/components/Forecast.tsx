import React, { ChangeEvent, FC } from "react"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import { forecastType } from "../types"
import Spinner from "./Spinner"
import Degree from "./Degree"
import {
    getHumidityValue,
    getPop,
    getSunTime,
    getVisibilityValue,
    getWindDirection,
} from "../utils"
import Tile from "./Tile"
import UnitSwitcher from "./UnitSwitcher"

interface Props {
    onBackClick: () => void
    forecastData: forecastType
    loadingForecast: boolean
    unit: string | null
    onUnitChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Forecast: FC<Props> = ({
    onBackClick,
    forecastData,
    loadingForecast,
    unit,
    onUnitChange,
}) => {
    if (loadingForecast) return <Spinner>Loading Forecast Data</Spinner>

    const unitType = unit === "imperial" ? "F" : unit === "metric" ? "C" : null
    const data = forecastData.list[0]

    return (
        <div className="w-[100vw] md:max-w-[800px] p-4 py-4 md:py-4 md:px-10 lg:px-24 h-auto rounded-lg">
            <div className="flex flex-auto justify-between mb-2">
                <button onClick={onBackClick}>
                    <FaRegArrowAltCircleLeft size={30} />
                </button>
                <UnitSwitcher onChange={onUnitChange} />
            </div>
            <div className="mx-auto w-full p-2 bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg  bg-gradient-to-br from-teal-100 via-green-100 to-red-100">
                <section className="text-center">
                    {forecastData.city.name && forecastData.city.country ? (
                        <h2 className="text-2xl font-black">
                            <span className="font-thin">
                                {forecastData.city.name},{" "}
                                {forecastData.city.country}
                            </span>
                        </h2>
                    ) : null}
                    <h1 className="text-4xl font-extrabold">
                        <Degree
                            temp={Math.round(data.main.temp)}
                            unit={unitType}
                        />
                    </h1>
                    <p className="text-sm">
                        {data.weather[0].main} ({data.weather[0].description})
                    </p>
                    <p className="text-sm">
                        H:{" "}
                        <Degree
                            temp={Math.ceil(data.main.temp_max)}
                            unit={unitType}
                        />
                        <span className="ml-4">
                            L:{" "}
                            <Degree
                                temp={Math.floor(data.main.temp_min)}
                                unit={unitType}
                            />
                        </span>
                    </p>
                </section>

                <h6 className="mt-2 text-lg font-bold">Hourly forecast</h6>
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

                <section className="flex flex-wrap justify-center text-zinc-700">
                    <Tile
                        icon="sunrise"
                        title="Sunrise Time"
                        info={getSunTime(forecastData.city.sunrise)}
                        description="Timezone: UTC"
                    />

                    <Tile
                        icon="sunset"
                        title="Sunset Time"
                        info={getSunTime(forecastData.city.sunset)}
                        description="Timezone: UTC"
                    />

                    <Tile
                        icon="wind"
                        title="Wind"
                        info={`${Math.round(data.wind.speed)} km/h`}
                        description={`${getWindDirection(
                            Math.round(data.wind.deg)
                        )}, gusts 
                        ${data.wind.gust.toFixed(1)} km/h`}
                    />
                    <Tile
                        icon="feels"
                        title="Feels like"
                        info={
                            <Degree
                                temp={Math.round(data.main.feels_like)}
                                unit={unitType}
                            />
                        }
                        description={`Feels ${
                            Math.round(data.main.feels_like) <
                            Math.round(data.main.temp)
                                ? "colder"
                                : "warmer"
                        }`}
                    />
                    <Tile
                        icon="humidity"
                        title="Humidity"
                        info={`${data.main.humidity} %`}
                        description={getHumidityValue(data.main.humidity)}
                    />
                    <Tile
                        icon="pop"
                        title="Precipitation"
                        info={`${Math.round(data.pop * 100)}%`}
                        description={`${getPop(data.pop)}, clouds at ${
                            data.clouds.all
                        }%`}
                    />
                    <Tile
                        icon="pressure"
                        title="Pressure"
                        info={`${data.main.pressure} hPa`}
                        description={` ${
                            Math.round(data.main.pressure) < 1013
                                ? "Lower"
                                : "Higher"
                        } than standard`}
                    />
                    <Tile
                        icon="visibility"
                        title="Visibility"
                        info={`${(data.visibility / 1000).toFixed()} km`}
                        description={getVisibilityValue(data.visibility)}
                    />
                </section>
            </div>
        </div>
    )
}

export default Forecast
