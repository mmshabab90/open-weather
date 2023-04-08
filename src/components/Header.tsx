import React, { ChangeEvent, FC } from "react"
import Degree from "./Degree"

interface Props {
    onUnitChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Header: FC<Props> = ({ onUnitChange }) => {
    return (
        <>
            <h1 className="text-4xl font-thin">
                Weather <span className="font-black">Forecast</span>
            </h1>
            <p className="text-sm mt-2">
                Enter the name of a place in the search box, you want to know
                the weather of and select an option from dropdown
            </p>
            <label className="relative flex justify-between items-center group p-2 text-xl">
                <Degree unit="C" />
                <input
                    type="checkbox"
                    className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                    onChange={onUnitChange}
                    checked={localStorage.getItem("unit") === "imperial"}
                />
                <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
                <span className="ml-3">
                    <Degree unit="F" />
                </span>
            </label>
        </>
    )
}

export default Header
