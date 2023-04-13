import { useEffect, useState } from "react"

export type locationData = {
    latitude: number
    longitude: number
    id: number
    zip: string
}

const useRandomLocationGenerator = () => {
    const [randomLocations, setRandomLocations] = useState<
        locationData[] | null
    >(null)
    useEffect(() => {
        fetch("https://random-data-api.com/api/v2/addresses?size=2")
            .then((res) => res.json())
            .then((data) => setRandomLocations(data))
            .catch((error) => console.log(error))

        return () => {
            setRandomLocations(null)
        }
    }, [])

    return randomLocations
}

export default useRandomLocationGenerator
