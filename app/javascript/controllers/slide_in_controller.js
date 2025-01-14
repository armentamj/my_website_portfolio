import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="slide-in"
export default class extends Controller {
  connect() {
    console.log("slide-in connected");

    // Add 'visible' class immediately after the page loads
    window.addEventListener("load", () => {
      this.slides();
    });
  }

  slides() {

    const hasVisited = localStorage.getItem("visited");
    if (!hasVisited) {
      localStorage.setItem("visited", "true");
      const navLoad = document.querySelector(".navi");
      navLoad.classList.add("navbar_visible"); // Add 'visible' class to trigger the animation
      const homeInfo = document.querySelector(".home_info");
      homeInfo.classList.add("home_visible");
      const imageElement = document.querySelector(".joel_pina_colada");
      imageElement.classList.add("joel_visible");
    } else {
      const imageElement = document.querySelector(".joel_pina_colada");
      imageElement.classList.remove("joel_slidie");
      const homeInfo = document.querySelector(".home_info");
      homeInfo.classList.remove("home_slidie");
      const navLoad = document.querySelector(".navi");
      navLoad.classList.remove("slidie");
    }
  }
}
