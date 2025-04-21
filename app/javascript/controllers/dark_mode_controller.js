import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dark-mode"
export default class extends Controller {
  // All elements that are on every view

  connect() {
    console.log("dark controller connected");
    // Check if a mode is stored in localStorage when the page loads
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      console.log(savedMode);
      this.applyMode(savedMode);
    }
  }

  dark(click) {
    // Get the mode from the clicked element's data-mode attribute
    const mode = click.target.dataset.mode; // Which ever of the clickable p tags was clicked on.
    localStorage.setItem('mode', mode); // Save the selected mode in localStorage
    console.log(mode);
    this.applyMode(mode);
    console.log(mode);
  }

  applyMode(mode) {
    // Get the mode from the clicked element's data-mode attribute
    const darky = document.querySelector(".darky"); // Dark clickable p tag in navbar
    const lighty = document.querySelector(".lighty"); // Light clickable p tag in navbar
    const relaxy = document.querySelector(".relaxy"); // Relax clickable p tag in navbar

    // All other elements
    const body = document.querySelector(".jack"); // Body element
    const linkys = document.querySelectorAll(".link-to"); // All link-to elements
    const bowtons = document.querySelectorAll(".bowton"); // All non-icon links
    const navis = document.querySelectorAll(".navi"); // Navigation Bar
    const eyes = document.querySelectorAll(".eye"); // Icon links
    const modus = document.querySelector(".modus"); // Modebar

    const homey = document.querySelector(".home_info"); // Div with info about me on home page
    const jay = document.querySelector(".joel_pina_colada"); // My image on the root(homepage) view

    const showaichone = document.querySelector(".showcase-h1");
    const caruselButtons = document.querySelectorAll(".carusel-buttons"); // Next and previous buttons
    const carusel = document.querySelector(".carusel-big"); // Main div in showcase
    const smallDiv = document.querySelector(".small-div"); // Div in showcase that displays the API info


    const contactWindow = document.querySelector(".contact-big"); //big div i.e. (.contact-big)in contact view

    // console.log(darky, lighty, relaxy, modus); // Debugging

    // if (!modus) {
    //   console.error('Error: .modus element is missing'); // Debugging
    //   return;
    // }
    // console.log("Current mode:", mode); // Debugging

    // Reset all previous modes
    body.classList.remove("body", "body-two", "body-three", "jockey-one-regular");
    bowtons.forEach(bowton => {
      bowton.classList.remove("navigation-knopfe", "navigation-knopfe-two", "navigation-knopfe-three", "titillium-web-regular");
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
    modus.classList.remove("big-mode", "big-mode-two", "big-mode-three");

    if (window.location.pathname === "/") {
      homey.classList.remove("dark_window", "light_window", "relax_window");
    } else if (window.location.pathname === "/showcase") {
      caruselButtons.forEach(caruselButton => {
        caruselButton.classList.remove("prevnext", "prevnext-two", "prevnext-three");
      });
      showaichone.classList.remove("dark_window", "light_window", "relax_window");
      carusel.classList.remove("light_window", "relax_window", "dark_window");
      smallDiv.classList.remove("small_div_bg", "small_div_bg_two", "small_div_bg_three");
    } else if (window.location.pathname === "/contact") {
      contactWindow.classList.remove("dark_window", "light_window", "relax_window");
    };

    


    // Apply styles based on the selected mode
    if (mode === "dark") {
      // Dark Mode
      body.classList.add("body-two", "titillium-web-regular");
      bowtons.forEach(bowton => bowton.classList.add("navigation-knopfe-two"));
      navis.forEach(navi => navi.classList.add("navigation-big-two"));
      darky.classList.add("show");
      lighty.classList.remove("show");
      relaxy.classList.remove("show");
      modus.classList.add("big-mode-two");
      linkys.forEach(link => link.classList.add("lt-two"));
      eyes.forEach(eye => eye.classList.add("navigation-i-two"));
      if (window.location.pathname === "/") {
        homey.classList.add("dark_window");
        jay.src = '/assets/joel.jpg';
      } else if (window.location.pathname === "/showcase") {
        carusel.classList.add("dark_window");
        showaichone.classList.add("dark_window");
        smallDiv.classList.add("small_div_bg_two");
        caruselButtons.forEach(caruselButton => {
          caruselButton.classList.add("prevnext-two");
        });
      } else if (window.location.pathname === "/contact") {
        contactWindow.classList.add("dark_window");
      };
    } else if (mode === "light") {
      // Light Mode
      body.classList.add("body-three", "titillium-web-regular");
      bowtons.forEach(bowton => bowton.classList.add("navigation-knopfe-three"));
      navis.forEach(navi => navi.classList.add("navigation-big-three"));
      darky.classList.remove("show");
      lighty.classList.add("show");
      relaxy.classList.remove("show");
      modus.classList.add("big-mode-three");
      linkys.forEach(link => link.classList.add("lt-three"));
      eyes.forEach(eye => eye.classList.add("navigation-i-three"));
      if (window.location.pathname === "/") {
        homey.classList.add("light_window");
        jay.src = '/assets/joel.jpg';
      } else if (window.location.pathname === "/showcase") {
        carusel.classList.add("light_window");
        showaichone.classList.add("light_window");
        smallDiv.classList.add("small_div_bg_three");
        caruselButtons.forEach(caruselButton => {
          caruselButton.classList.add("prevnext-three");
        });
      } else if (window.location.pathname === "/contact") {
        contactWindow.classList.add("light_window");
      };
    } else if (mode === "relax") {
      // Relax Mode
      body.classList.add("body", "jockey-one-regular");
      bowtons.forEach(bowton => bowton.classList.add("navigation-knopfe"));
      navis.forEach(navi => navi.classList.add("navigation-big"));
      darky.classList.remove("show");
      lighty.classList.remove("show");
      relaxy.classList.add("show");
      modus.classList.add("big-mode");
      linkys.forEach(link => link.classList.add("lt"));
      eyes.forEach(eye => eye.classList.add("navigation-i"));
      if (window.location.pathname === "/") {
        homey.classList.add("light_window");
        jay.src = '/images/joel_pina_colada.jpg';
      } else if (window.location.pathname === "/showcase") {
          carusel.classList.add("relax_window");
          showaichone.classList.add("relax_window");
          smallDiv.classList.add("small_div_bg");
          caruselButtons.forEach(caruselButton => {
            caruselButton.classList.add("prevnext");
          });
      } else if (window.location.pathname === "/contact") {
        contactWindow.classList.add("relax_window");
      };
    }
  }
}