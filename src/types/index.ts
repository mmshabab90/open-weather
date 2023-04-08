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

type coordType = {
    lon: number
    lat: number
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
    cod: number
    coord: coordType
}

type listType = {
    dt: number
    main: mainType
    weather: weatherType[]
    clouds: {
        all: number
    }
    wind: windType
    visibility: number
    dt_txt: string
    pop: number
}

export type forecastType = {
    list: listType[]
    city: {
        name: string
        country: string
        sunrise: number
        sunset: number
    }
}
