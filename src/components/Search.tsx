import React, { ChangeEvent, FC } from "react"
import { optionType } from "../types"
import Suggestions from "./Suggestions"
import { FaSearchLocation, FaMapMarker } from "react-icons/fa"
import Tooltip from "./Tooltip"

interface Props {
    term: string
    options: optionType[] | []
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onOptionSelect: (option: optionType) => void
    onSubmit: () => void
    getUserLocation: () => void
}

const Search: FC<Props> = ({
    term,
    options,
    onInputChange,
    onOptionSelect,
    onSubmit,
    getUserLocation,
}) => {
    return (
        <div className="relative md:block w-full mt-10 md:mt-4">
            <div
                className="absolute inset-y-0 left-0 
      flex items-center pl-3 pointer-events-none"
            >
                <FaSearchLocation />
            </div>
            <input
                type="text"
                className="block w-full p-2 pl-10 rounded-l-lg rounded-r-lg rounded-t-lg border-white dark:placeholder-gray-400"
                placeholder="Search Location..."
                value={term}
                onChange={onInputChange}
            />
            <Suggestions options={options} onSelect={onOptionSelect} />
            <button
                className="absolute inset-y-0 right-0 
      flex items-center pr-2 cursor-pointer"
                onClick={getUserLocation}
            >
                <Tooltip tooltipText="Get Current Location">
                    <FaMapMarker />
                </Tooltip>
            </button>
        </div>
    )
}

export default Search
