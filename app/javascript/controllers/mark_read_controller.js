import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    threshold: { type: Number, default: 1.0 }
  }

  connect() {
    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
      threshold: this.thresholdValue
    });

    this.observeMessages();
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  observeMessages() {
    const messages = document.querySelectorAll(".message.friend[data-message-id]");
    messages.forEach(message => this.observer.observe(message));
  }

  handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const messageId = el.dataset.messageId;

        if (messageId && !el.classList.contains("marked-read")) {
          fetch(`/messages/${messageId}/mark_read`, {
            method: "POST",
            headers: {
              "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
              "Content-Type": "application/json"
            }
          });
          el.classList.add("marked-read");
        }
      }
    });
  }
}
