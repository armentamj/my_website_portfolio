import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // Listen for keydown events anywhere within the connected element (e.g. <body>)
    this.element.addEventListener("keydown", this.handleKeyDown)
  }

  disconnect() {
    this.element.removeEventListener("keydown", this.handleKeyDown)
  }

  handleKeyDown = (event) => {
    const target = event.target

    // Check that the key press is inside a <textarea> and Enter was pressed (without Shift)
    if (
      target.tagName === "TEXTAREA" &&
      !event.shiftKey &&
      event.key === "Enter"
    ) {
      const form = target.closest("form")
      if (form) {
        event.preventDefault()
        form.requestSubmit() // Properly submit the form
      }
    }
  }
}

