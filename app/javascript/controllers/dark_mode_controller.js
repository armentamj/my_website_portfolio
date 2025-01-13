import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dark-mode"
export default class extends Controller {

  dark(click) {
    // Get the mode from the clicked element's data-mode attribute
    const mode = click.target.dataset.mode;
    const darky = document.querySelector(".darky");
    const lighty = document.querySelector(".lighty");
    const relaxy = document.querySelector(".relaxy");
    const bodys = document.querySelectorAll(".jack");
    const linkys = document.querySelectorAll(".link-to"); // All link-to elements
    const bowtons = document.querySelectorAll(".bowton");
    const navis = document.querySelectorAll(".navi");
    const eyes = document.querySelectorAll(".eye");

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
      linkys.forEach(link => link.classList.add("lt-two"));
      eyes.forEach(eye => eye.classList.add("navigation-i-two"));
      const homey = document.querySelector(".home_info");
      homey.classList.remove("relax_window");
    } else if (mode === "light") {
      // Light Mode
      bodys.forEach(body => body.classList.add("body-three", "titillium-web-regular"));
      bodys.forEach(body => body.classList.remove("jockey-one-regular"));
      bowtons.forEach(bowton => bowton.classList.add("navigation-knopfe-three"));
      navis.forEach(navi => navi.classList.add("navigation-big-three"));
      darky.classList.remove("show");
      lighty.classList.add("show");
      relaxy.classList.remove("show");
      linkys.forEach(link => link.classList.add("lt-three"));
      eyes.forEach(eye => eye.classList.add("navigation-i-three"));
      const homey = document.querySelector(".home_info");
      homey.classList.remove("relax_window")
    } else if (mode === "relax") {
      // Relax Mode
      bodys.forEach(body => body.classList.add("body", "jockey-one-regular"));
      bodys.forEach(body => body.classList.remove("titillium-web-regular"));
      bowtons.forEach(bowton => bowton.classList.add("navigation-knopfe"));
      navis.forEach(navi => navi.classList.add("navigation-big"));
      darky.classList.remove("show");
      lighty.classList.remove("show");
      relaxy.classList.add("show");
      linkys.forEach(link => link.classList.add("lt"));
      eyes.forEach(eye => eye.classList.add("navigation-i"));
      const homey = document.querySelector(".home_info");
      homey.classList.add("relax_window");
    }
  }
}
