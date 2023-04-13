export const getWindDirection = (value: number): string => {
    switch (true) {
        case value > 15 && value <= 75:
            return "NE"
        case value > 76 && value <= 105:
            return "E"
        case value > 105 && value <= 165:
            return "SE"
        case value > 166 && value <= 195:
            return "S"
        case value > 195 && value <= 255:
            return "SW"
        case value > 255 && value <= 285:
            return "W"
        case value > 285 && value <= 345:
            return "NW"
        default:
            return "N"
    }
}

export const getHumidityValue = (level: number): string => {
    if (level <= 55) return "Dry and comfortable"
    if (level > 55 && level <= 65) return "A bit uncomfortable, sticky feeling"

    return "Lots of moisture, uncomfortable air"
}

export const getVisibilityValue = (number: number): string => {
    if (number <= 50) return "Dangerously foggy"
    if (number <= 500) return "Expect heavy fog"
    if (number <= 2000) return "Expect some fog"
    if (number <= 9000) return "Expect some haze"

    return "Very clear day"
}

export const getSunTime = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    let hours = date.getHours().toString()
    let minutes = date.getMinutes().toString()

    if (hours.length <= 1) hours = `0${hours}`
    if (minutes.length <= 1) minutes = `0${minutes}`

    return `${hours}:${minutes}`
}

export const getPop = (value: number): string => {
    if (value <= 0.33) return "Low probability"
    if (value > 0.33 && value <= 0.66) return "Moderate probability"

    return "High probability"
}
