import { useEffect, useState } from "react"

export type locationData = {
    latitude: number
    longitude: number
    id: number
    zip: string
}

const useRandomLocationGenerator = () => {
    const [randomLocations, setRandomLocaitons] = useState<
        locationData[] | null
    >(null)
    useEffect(() => {
        fetch("https://random-data-api.com/api/v2/addresses?size=2")
            .then((res) => res.json())
            .then((data) => setRandomLocaitons(data))
            .catch((error) => console.log(error))

        return () => {
            setRandomLocaitons(null)
        }
    }, [])

    return randomLocations
}

export default useRandomLocationGenerator
