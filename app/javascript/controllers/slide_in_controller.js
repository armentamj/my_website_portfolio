import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="slide-in"
export default class extends Controller {
  connect() {
    window.addEventListener("turbo:load", () => {
      console.log("slide-in connected");
      this.slides();
    });
  }

  slides() {
    const hasVisited = localStorage.getItem("visited");
    if (window.location.pathname === "/") {
      if (!hasVisited && document.documentElement.clientWidth <= 1470) {
        localStorage.setItem("visited", "true");
        const navLoad = document.querySelector(".navi");
        navLoad.classList.add("navbar_visible");
        const homeInfo = document.querySelector(".home_info");
        homeInfo.classList.add("home_visible");
        const image = document.querySelector(".joel_pina_colada");
        image.classList.add("joel_visible");
  
      } else if (!hasVisited) {
          localStorage.setItem("visited", "true");
          const body = document.querySelector(".jack");
          body.classList.add("temp-body");
          const navLoad = document.querySelector(".navi");
          navLoad.classList.add("navbar_visible");
          const homeInfo = document.querySelector(".home_info");
          homeInfo.classList.add("home_visible");
          const image = document.querySelector(".joel_pina_colada");
          image.classList.add("joel_visible");
    
          setTimeout(() => {
            body.classList.remove("temp-body");
          }, 2500);
  
      } else {
        console.log(hasVisited);
        const image = document.querySelector(".joel_pina_colada");
        image.style.transition = 'opacity 0s'
        image.classList.add("joel_visible");
        const homeInfo = document.querySelector(".home_info");
        homeInfo.style.transition = 'translate 0s';
        homeInfo.classList.add("home_visible");
        const navLoad = document.querySelector(".navi");
        navLoad.style.transition = 'translate 0s';
        navLoad.classList.add("navbar_visible");
      }
    } else {
      const navLoad = document.querySelector(".navi");
      navLoad.style.transition = 'translate 0s';
      navLoad.classList.add("navbar_visible");
    }
  }
}
