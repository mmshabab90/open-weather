import React, { FC } from "react"
import { FaRegArrowAltCircleLeft } from "react-icons/fa"

interface Props {
    onBackClick: () => void
}

const Forecast: FC<Props> = ({ onBackClick }) => {
    return (
        <>
            <button onClick={onBackClick}>
                <FaRegArrowAltCircleLeft />
            </button>
            <p>Weather and Forecast data here</p>
        </>
    )
}

export default Forecast
