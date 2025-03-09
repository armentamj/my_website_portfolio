import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dark-mode"
export default class extends Controller {

  dark(click) {
    // Get the mode from the clicked element's data-mode attribute
    const mode = click.target.dataset.mode;//Which ever of the clickable p tags was clicked on.
    const darky = document.querySelector(".darky");//Dark clickable p tag in navbar
    const lighty = document.querySelector(".lighty");//Light clickable p tag in navbar
    const relaxy = document.querySelector(".relaxy");//Relax clickable p tag in navbar
    const bodys = document.querySelectorAll(".jack"); //Body element
    const linkys = document.querySelectorAll(".link-to"); // All link-to elements
    const bowtons = document.querySelectorAll(".bowton");//All non-icon links
    const navis = document.querySelectorAll(".navi");//Navigation Bar
    const eyes = document.querySelectorAll(".eye");//Icon links
    const modus = document.querySelector(".modus");//Modeba

    console.log("Current mode:", mode); // Debugging

    // Reset all previous modes
    bodys.forEach(body => {
      body.classList.remove("body", "body-two", "body-three");
    });
    bowtons.forEach(bowton => {
      bowton.classList.remove("navigation-knopfe", "navigation-knopfe-two", "navigation-knopfe-three");
    });
    navis.forEach(navi => {
      navi.classList.remove("navigation-big", "navigation-big-two", "navigation-big-three");
    });
    linkys.forEach(link => {
      link.classList.remove("lt", "lt-two", "lt-three");
    });
    eyes.forEach(eye => {
      eye.classList.remove("navigation-i", "navigation-i-two", "navigation-i-three");
    });

    // Apply styles based on the selected mode
    if (mode === "dark") {
      // Dark Mode
      bodys.forEach(body => body.classList.add("body-two", "titillium-web-regular"));
      bodys.forEach(body => body.classList.remove("jockey-one-regular"));
      bowtons.forEach(bowton => bowton.classList.add("navigation-knopfe-two"));
      navis.forEach(navi => navi.classList.add("navigation-big-two"));
      darky.classList.add("show");
      lighty.classList.remove("show");
      relaxy.classList.remove("show");
      modus.classList.replace("big-mode", "big-mode-two");
      modus.classList.replace("big-mode-three", "big-mode-two");
      linkys.forEach(link => link.classList.add("lt-two"));
      eyes.forEach(eye => eye.classList.add("navigation-i-two"));
      const homey = document.querySelector(".home_info");
      homey.classList.remove("relax_window");
      homey.classList.remove("light_window");
      homey.classList.add("dark_window");
      let jay = document.querySelector(".joel_pina_colada");
      jay.src = '/assets/joel.jpg';
    } else if (mode === "light") {
      // Light Mode
      bodys.forEach(body => body.classList.add("body-three", "titillium-web-regular"));
      bodys.forEach(body => body.classList.remove("jockey-one-regular"));
      bowtons.forEach(bowton => bowton.classList.add("navigation-knopfe-three"));
      navis.forEach(navi => navi.classList.add("navigation-big-three"));
      darky.classList.remove("show");
      lighty.classList.add("show");
      relaxy.classList.remove("show");
      modus.classList.replace("big-mode", "big-mode-three");
      modus.classList.replace("big-mode-two", "big-mode-three");
      linkys.forEach(link => link.classList.add("lt-three"));
      eyes.forEach(eye => eye.classList.add("navigation-i-three"));
      const homey = document.querySelector(".home_info");
      homey.classList.remove("relax_window");
      homey.classList.remove("dark_window");
      homey.classList.add("light_window");
      let jay = document.querySelector(".joel_pina_colada");
      jay.src = '/assets/joel.jpg';
    } else if (mode === "relax") {
      // Relax Mode
      bodys.forEach(body => body.classList.add("body", "jockey-one-regular"));
      bodys.forEach(body => body.classList.remove("titillium-web-regular"));
      bowtons.forEach(bowton => bowton.classList.add("navigation-knopfe"));
      navis.forEach(navi => navi.classList.add("navigation-big"));
      darky.classList.remove("show");
      lighty.classList.remove("show");
      relaxy.classList.add("show");
      modus.classList.replace("big-mode-two", "big-mode");
      modus.classList.replace("big-mode-three", "big-mode");
      linkys.forEach(link => link.classList.add("lt"));
      eyes.forEach(eye => eye.classList.add("navigation-i"));
      const homey = document.querySelector(".home_info");
      homey.classList.remove("light_window");
      homey.classList.remove("dark_window");
      homey.classList.add("relax_window");
      let jay = document.querySelector(".joel_pina_colada");
      jay.src = '/assets/joel_pina_colada.jpg';
    }
  }
}
