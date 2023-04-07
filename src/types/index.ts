export type optionType = {
    name: string
    country: string
    lat: number
    lon: number
}
export type errorType = {
    error: string
    humanReadable: string
}

type weatherType = {
    id: number
    main: string
    description: string
    icon: string
}

type mainType = {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
}

type sysType = {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
}

type windType = {
    speed: number
    deg: number
    gust: number
}

export type weatherDataType = {
    weather: weatherType[]
    main: mainType
    visibility: number
    wind: windType
    sys: sysType
    name: string
}

type listType = {
    dt: number
    main: mainType
    weather: weatherType[]
    wind: windType
    visibility: number
    dt_txt: string
}

export type forecastType = {
    list: listType[]
    city: {
        name: string
        country: string
        population: number
    }
}
