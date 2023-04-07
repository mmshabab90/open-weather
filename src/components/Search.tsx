import React, { ChangeEvent, FC } from "react"
import { optionType } from "../types"
import Suggestions from "./Suggestions"

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
        <div className="relative flex mt-10 md:mt-4">
            <input
                type="text"
                value={term}
                className="px-2 py-1 border-2 border-white"
                onChange={onInputChange}
                placeholder="Enter location name"
            />

            <Suggestions options={options} onSelect={onOptionSelect} />

            <button
                className="rounded border-2 border-l-zinc-100 border-b-zinc-100 border-t-zinc-100 hover:border-zinc-500 hover:text-zinc-500  text-black-100 px-2 py-1 cursor-pointer"
                onClick={onSubmit}
            >
                Search
            </button>
            <button
                className="rounded-r-md border-2 border-r-zinc-100 border-b-zinc-100 border-t-zinc-100 hover:border-zinc-500 hover:text-zinc-500  text-black-100 px-2 py-1 cursor-pointer"
                onClick={getUserLocation}
            >
                Get Current Location
            </button>
        </div>
    )
}

export default Search
