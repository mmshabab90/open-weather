import React, { FC, ReactElement } from "react"
import {
    WiStrongWind,
    WiThermometer,
    WiHumidity,
    WiSunrise,
    WiSunset,
} from "react-icons/wi"
import { FaEye } from "react-icons/fa"
import { IoWater, IoSpeedometerOutline } from "react-icons/io5"

type iconType =
    | "wind"
    | "feels"
    | "humidity"
    | "visibility"
    | "pressure"
    | "pop"
    | "sunrise"
    | "sunset"

interface Props {
    icon: iconType
    title: string
    data: string | ReactElement
    textDescription?: string | ReactElement
}

const icons = {
    wind: <WiStrongWind />,
    feels: <WiThermometer />,
    humidity: <WiHumidity />,
    visibility: <FaEye />,
    pressure: <IoSpeedometerOutline />,
    pop: <IoWater />,
    sunrise: <WiSunrise />,
    sunset: <WiSunset />,
}

const Tile: FC<Props> = ({ icon, title, data, textDescription }) => {
    const Icon = icons[icon]

    return (
        <article
            id="forecast-tile"
            className="items-start justify-center w-full h-auto md:w-[140px] md:h-[130px] md:mr-4 lg:mr-4 text-zinc-700 p-2 mb-5 flex flex-col bg-white bg-opacity-20 backdrop-blur-ls rounded-2xl drop-shadow-xl"
        >
            <div className="flex items-center text-sm font-bold">
                {Icon}{" "}
                <h4 className="ml-1" id="tile-title">
                    {title}
                </h4>
            </div>
            <h3 className="mt-2 text-lg" id="tile-info">
                {data}
            </h3>

            {textDescription && (
                <div className="text-xs font-bold" id="tile-desc">
                    {textDescription}
                </div>
            )}
        </article>
    )
}

export default Tile
