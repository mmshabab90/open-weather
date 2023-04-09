import React from "react"
import { render, screen } from "@testing-library/react"
import Spinner from "./Spinner"
import "@testing-library/jest-dom/extend-expect"

test("Render the spinner with the provided child prop", () => {
    const renderSpinner = render(<Spinner>Loading content...</Spinner>)
    const spinnerElement = renderSpinner.container.querySelector("#spinner")
    const childElement =
        renderSpinner.container.querySelector("#spinner-content")
    expect(childElement).toHaveTextContent("Loading content...")
    expect(spinnerElement).toHaveAttribute("role", "status")
})
