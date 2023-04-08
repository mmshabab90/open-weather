import React, { FC } from "react"

interface Prop {
    temp?: number
    unit?: string | null
}
const Degree: FC<Prop> = ({ temp, unit }) => {
    return (
        <>
            {temp} &deg;
            {unit}
        </>
    )
}

export default Degree
