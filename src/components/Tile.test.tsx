import React from "react"
import { render, screen } from "@testing-library/react"
import Tile from "./Tile"
import "@testing-library/jest-dom/extend-expect"
import { getHumidityValue } from "../utils"

test("Render tile with correct prop", () => {
    const renderedTile = render(
        <Tile
            icon="humidity"
            title="Humidity"
            info={"8 %"}
            description={getHumidityValue(8)}
        />
    )
    const tileElement = renderedTile.container.querySelector("#forecast-tile")
    expect(tileElement).toBeInTheDocument()
})

test("Render tile without description as it is an optional prop", () => {
    const renderedTile = render(<Tile icon="humidity" title="Humidity" info={"8 %"} />)
    const tileElement = renderedTile.container.querySelector("#forecast-tile")
    expect(tileElement).toBeInTheDocument()
    const tileDescription = renderedTile.container.querySelector("tile-desc")
    
    expect(tileDescription).toBeNull()
})

test("Render humidity for value <=50", () => {
    const renderedTile = render(
        <Tile
            icon="humidity"
            title="Humidity"
            info={"8 %"}
            description={getHumidityValue(8)}
        />
    )
    const tileTitle = renderedTile.container.querySelector("#tile-title")
    expect(tileTitle).toHaveTextContent("Humidity")

    const tileInfo = renderedTile.container.querySelector("#tile-info")
    expect(tileInfo).toHaveTextContent("8 %")

    const tileDescription = renderedTile.container.querySelector("#tile-desc")
    expect(tileDescription).toHaveTextContent("Dry and comfortable")
})

test("Render humidity for value > 50 and <= 65", () => {
    const renderedTile = render(
        <Tile
            icon="humidity"
            title="Humidity"
            info={"59 %"}
            description={getHumidityValue(59)}
        />
    )

    const tileTitle = renderedTile.container.querySelector("#tile-title")
    expect(tileTitle).toHaveTextContent("Humidity")

    const tileInfo = renderedTile.container.querySelector("#tile-info")
    expect(tileInfo).toHaveTextContent("59 %")

    const tileDescription = renderedTile.container.querySelector("#tile-desc")
    expect(tileDescription).toHaveTextContent(
        "A bit uncomfortable, sticky feeling"
    )
})

test("Render humidity for value > 65", () => {
    const renderedTile = render(
        <Tile
            icon="humidity"
            title="Humidity"
            info={"89 %"}
            description={getHumidityValue(89)}
        />
    )

    const tileTitle = renderedTile.container.querySelector("#tile-title")
    expect(tileTitle).toHaveTextContent("Humidity")

    const tileInfo = renderedTile.container.querySelector("#tile-info")
    expect(tileInfo).toHaveTextContent("89 %")

    const tileDescription = renderedTile.container.querySelector("#tile-desc")
    expect(tileDescription).toHaveTextContent(
        "Lots of moisture, uncomfortable air"
    )
})
