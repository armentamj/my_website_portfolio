import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="slide-in"
export default class extends Controller {
  connect() {
    console.log("slide-in connected");
  }

  slides() {
    
  }
}
