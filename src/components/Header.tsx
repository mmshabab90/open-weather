import React, { ChangeEvent, FC } from "react"
import UnitSwitcher from "./UnitSwitcher"

interface Props {
    onUnitChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Header: FC<Props> = ({ onUnitChange }) => {
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div>
                    <h1 className="text-4xl font-thin">
                        Weather <span className="font-black">Forecast</span>
                    </h1>
                </div>
                <div className="p-2">
                    <p className="text-sm mt-2 md:pl-44 md:pr-44">
                        Enter the name of a place in the search box, you want to
                        know the weather of and select an option from dropdown.
                        You can also click on the location marker to get the
                        weather forecast of your location.
                    </p>
                </div>
            </div>
            <UnitSwitcher onChange={onUnitChange} />
        </>
    )
}

export default Header
