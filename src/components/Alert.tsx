import React, { FC } from "react"
import { errorType } from "../types"

interface Props {
    error: errorType | null
    color: string
}

const Alert: FC<Props> = ({ error,color }) => {
    return (
        error && (
            <section
                className={`flex flex-col mb-4 mt-4 w-3/4 rounded-lg ${color} px-6 py-5 text-base font-semibold text-black`}
                role="alert"
            >
                <div className="font-bold">{error.humanReadable}</div>
                <div className="font-thin">{error.error}</div>
            </section>
        )
    )
}

export default Alert
