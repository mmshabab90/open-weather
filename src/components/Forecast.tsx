import React, { ChangeEvent, FC, ReactElement } from "react"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"
import { DefaultTemperatureUnit, optionType } from "../types"
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
import useForecast from "../hooks/useForecast"
import Alert from "./Alert"

interface Props {
    onBackClick: () => void
    city: optionType
    unit: string | null
    onUnitChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Forecast: FC<Props> = ({ onBackClick, city, unit, onUnitChange }) => {
    const { loadingForecast, forecastData, errorForecastMessage } = useForecast(
        city.lat,
        city.lon,
        unit
    )

    if (loadingForecast)
        return (
            <Container>
                <div className="flex flex-auto items-center justify-center">
                    <Spinner>Loading Forecast Data...</Spinner>
                </div>
            </Container>
        )

    if (!forecastData || errorForecastMessage)
        return <Alert error={errorForecastMessage} color="bg-rose-300" />

    const unitType = unit === "imperial" ? "F" : unit === "metric" ? "C" : null
    const data = forecastData.list[0]

    return (
        <Container>
            <>
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
                                    {`${forecastData.city.name}, ${forecastData.city.country}`}
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
                            {data.weather[0].main} (
                            {data.weather[0].description})
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
                            data={getSunTime(forecastData.city.sunrise)}
                            textDescription="Timezone: UTC"
                        />

                        <Tile
                            icon="sunset"
                            title="Sunset Time"
                            data={getSunTime(forecastData.city.sunset)}
                            textDescription="Timezone: UTC"
                        />

                        <Tile
                            icon="wind"
                            title="Wind"
                            data={
                                localStorage.getItem(
                                    DefaultTemperatureUnit.key
                                ) === DefaultTemperatureUnit.value
                                    ? `${Math.round(data.wind.speed)} m/s`
                                    : `${Math.round(data.wind.speed)} mph`
                            }
                            textDescription={`${getWindDirection(
                                Math.round(data.wind.deg)
                            )}, gusts 
                        ${data.wind.gust.toFixed(1)} ${
                                localStorage.getItem(
                                    DefaultTemperatureUnit.key
                                ) === DefaultTemperatureUnit.value
                                    ? ` m/s`
                                    : ` mph`
                            }`}
                        />
                        <Tile
                            icon="feels"
                            title="Feels like"
                            data={
                                <Degree
                                    temp={Math.round(data.main.feels_like)}
                                    unit={unitType}
                                />
                            }
                            textDescription={`Feels ${
                                Math.round(data.main.feels_like) <
                                Math.round(data.main.temp)
                                    ? "colder"
                                    : "warmer"
                            }`}
                        />
                        <Tile
                            icon="humidity"
                            title="Humidity"
                            data={`${data.main.humidity} %`}
                            textDescription={getHumidityValue(
                                data.main.humidity
                            )}
                        />
                        <Tile
                            icon="pop"
                            title="Precipitation"
                            data={`${Math.round(data.pop * 100)}%`}
                            textDescription={`${getPop(data.pop)}, clouds at ${
                                data.clouds.all
                            }%`}
                        />
                        <Tile
                            icon="pressure"
                            title="Pressure"
                            data={`${data.main.pressure} hPa`}
                            textDescription={` ${
                                Math.round(data.main.pressure) < 1013
                                    ? "Lower"
                                    : "Higher"
                            } than standard`}
                        />
                        <Tile
                            icon="visibility"
                            title="Visibility"
                            data={`${(data.visibility / 1000).toFixed()} km`}
                            textDescription={getVisibilityValue(
                                data.visibility
                            )}
                        />
                    </section>
                </div>
            </>
        </Container>
    )
}

const Container: FC<{ children: ReactElement }> = ({ children }) => {
    return (
        <div className="w-[100vw] md:max-w-[800px] p-4 py-4 md:py-4 md:px-10 lg:px-24 h-auto rounded-lg">
            {children}
        </div>
    )
}

export default Forecast
