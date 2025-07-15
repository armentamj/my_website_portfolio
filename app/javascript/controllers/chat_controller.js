// app/javascript/controllers/chat_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["messagesThread", "textarea"]

  connect() {
    console.log("✅ Chat controller connected")
    if (!this.hasMessagesThreadTarget) {
      console.log("❌ Missing messagesThread")
      return
    }
    this.scrollMessagesToBottom()
    this.focusTextarea()
    this.element.addEventListener("turbo:frame-load", this.scrollMessagesToBottom.bind(this))
    this.element.addEventListener("turbo:stream-render", this.handleStreamRender.bind(this))
  }

  disconnect() {
    this.element.removeEventListener("turbo:frame-load", this.scrollMessagesToBottom.bind(this))
    this.element.removeEventListener("turbo:stream-render", this.handleStreamRender.bind(this))
  }

  scrollMessagesToBottom() {
    console.log("🔽 scrollMessagesToBottom")
    setTimeout(() => {
      if (this.hasMessagesThreadTarget) {
        this.messagesThreadTarget.scrollTop = this.messagesThreadTarget.scrollHeight
        console.log("Scrolled to bottom")
      }
    }, 100)
  }

  focusTextarea() {
    if (this.hasTextareaTarget) {
      this.textareaTarget.focus()
      console.log("Text area focused")
    } else {
      console.log("❌ Missing textarea target")
    }
  }

  handleStreamRender() {
    this.scrollMessagesToBottom()
    this.focusTextarea()
  }
}