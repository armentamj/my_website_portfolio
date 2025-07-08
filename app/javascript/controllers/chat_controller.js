import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="chat"
export default class extends Controller {
  connect() {
    console.log("✅ Chat controller connected")

    this.scrollMessagesToBottom()
    this.decorateAllMessages()
    this.observeNewMessages()
  }

  scrollMessagesToBottom() {
    console.log("🔽 scrollMessagesToBottom")
    const messages = document.querySelector(".messages-thread")
    if (messages) {
      setTimeout(() => {
        messages.scrollTop = messages.scrollHeight
        console.log("Scrolled to bottom")
      }, 50)
    }
  }

  decorateMessageEl(messageEl, currentUserId) {
    const messageUserId = messageEl.dataset.userId
    if (!messageUserId) {
      console.log("❗ No messageUserId")
      return
    }

    if (parseInt(messageUserId) === parseInt(currentUserId)) {
      messageEl.classList.add("me")
    } else {
      messageEl.classList.add("friend")
    }
  }

  decorateAllMessages() {
    console.log("✨ decorateAllMessages")
    const chatContainer = document.querySelector(".chat-show-big")
    if (!chatContainer) {
      console.log("❌ no .chat-show-big")
      return
    }

    const currentUserId = chatContainer.dataset.currentUserId
    if (!currentUserId) {
      console.log("❌ no currentUserId")
      return
    }

    document.querySelectorAll(".messages-thread .message").forEach(messageEl => {
      this.decorateMessageEl(messageEl, currentUserId)
    })
  }

  observeNewMessages() {
    console.log("👀 observeNewMessages")
    const chatContainer = document.querySelector(".chat-show-big")
    if (!chatContainer) {
      console.log("❌ no chatContainer")
      return
    }

    const currentUserId = chatContainer.dataset.currentUserId
    if (!currentUserId) {
      console.log("❌ no currentUserId")
      return
    }

    const target = document.querySelector(".messages-thread")
    if (!target) {
      console.log("❌ no .messages-thread")
      return
    }

    const observer = new MutationObserver(mutationsList => {
      for (const mutation of mutationsList) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1 && node.classList.contains("message")) {
            this.decorateMessageEl(node, currentUserId)
            this.scrollMessagesToBottom()
          }
        })
      }
    })

    observer.observe(target, { childList: true, subtree: true })
  }
}
