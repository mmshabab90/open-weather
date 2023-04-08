import React, { ChangeEvent, FC, ReactElement } from "react"
import { optionType } from "../types"
import Suggestions from "./Suggestions"
import { FaSearchLocation, FaMapMarker } from "react-icons/fa"
import Tooltip from "./Tooltip"
import Header from "./Header"

interface Props {
    children: ReactElement
    term: string
    options: optionType[] | []
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onOptionSelect: (option: optionType) => void
    getUserLocation: () => void
    onUnitChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Search: FC<Props> = ({
    children,
    term,
    options,
    onInputChange,
    onOptionSelect,
    getUserLocation,
    onUnitChange,
}) => {
    return (
        <>
            <Header onUnitChange={onUnitChange} />
            <section className="w-full md:max-w-[800px] p-4 py-4 md:py-4 md:px-10 lg:px-24 h-auto lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
                <div className="relative flex mt-10 md:mt-4 rounded">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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

                {children}
            </section>
        </>
    )
}

export default Search
