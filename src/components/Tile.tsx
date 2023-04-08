import React, { FC, ReactElement } from "react"
import { WiStrongWind, WiThermometer, WiHumidity } from "react-icons/wi"
import { FaEye } from "react-icons/fa"
import { IoWater, IoSpeedometerOutline } from "react-icons/io5"

type iconType =
    | "wind"
    | "feels"
    | "humidity"
    | "visibility"
    | "pressure"
    | "pop"

interface Props {
    icon: iconType
    title: string
    info: string | ReactElement
    description?: string | ReactElement
}

const icons = {
    wind: <WiStrongWind />,
    feels: <WiThermometer />,
    humidity: <WiHumidity />,
    visibility: <FaEye />,
    pressure: <IoSpeedometerOutline />,
    pop: <IoWater />,
}

const Tile: FC<Props> = ({ icon, title, info, description }) => {
    const Icon = icons[icon]

    return (
        <article className="w-[140px] h-[130px] text-zinc-700 bg-white/20 backdrop-blur-ls rounded drop-shadow-lg p-2 mb-5 flex flex-col justify-between">
            <div className="flex items-center text-sm font-bold">
                {Icon} <h4 className="ml-1">{title}</h4>
            </div>
            <h3 className="mt-2 text-lg">{info}</h3>

            <div className="text-xs font-bold">{description}</div>
        </article>
    )
}

export default Tile
