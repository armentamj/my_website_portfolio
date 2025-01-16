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
      // localStorage.setItem("visited", "true");
      const navLoad = document.querySelector(".navi");
      navLoad.classList.add("navbar_visible");
      const homeInfo = document.querySelector(".home_info");
      homeInfo.classList.add("home_visible");
      const image = document.querySelector(".joel_pina_colada");
      image.classList.add("joel_visible");
    } else {
      const image = document.querySelector(".joel_pina_colada");
      image.classList.remove("joel_slidie");
      const homeInfo = document.querySelector(".home_info");
      homeInfo.classList.remove("home_slidie");
      const navLoad = document.querySelector(".navi");
      navLoad.classList.remove("slidie");
    }
  }
}
