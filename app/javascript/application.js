// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

import Rails from "@rails/ujs"
Rails.start()

document.addEventListener("turbo:stream-error", (event) => {
  console.error("Turbo Stream error:", event.detail);
});

import "controllers"