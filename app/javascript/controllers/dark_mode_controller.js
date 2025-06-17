import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dark-mode"
export default class extends Controller {
  // static property to ensure turbo:frame-load listener is added once
  static turboFrameListenerAdded = false;

  //connect method being used to trigger applyMode when any view is loaded or a turbo frame is triggered.
  connect() {
    console.log("dark controller connected");

    // this part is to trigger the applyMode when a view is laoded
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
      this.applyMode(savedMode);
    }

    // in this part if the static turboFrameListenerAdded variable is false meaning it has not run yet and
    //  a turboframe is refreshed the applyMode function is exicuted and the turboFrameListenerAdded flag will be changed to true, hence only running once
    if (!this.constructor.turboFrameListenerAdded) {
      document.addEventListener("turbo:frame-load", () => {
        const savedMode = localStorage.getItem('mode'); // targeting browser's stores key called mode

        // if any savedMode key exists this runs
        if (savedMode) {
          this.applyMode(savedMode); // applyMode function is triggered with the browser's key mode
        }
      });
      this.constructor.turboFrameListenerAdded = true; // what lets the turboframelistener
    }
  }

  // dark method is triggered when the elements that are the buttons for the different modes are clicked and in turn the dark mode triggers the applyMode function
  dark(click) {
    const mode = click.target.dataset.mode; // targetting the clicked button's data set city
    localStorage.setItem('mode', mode); // setting what the data-set mode is on the spacific button
    this.applyMode(mode); // tells the function applyMode to run
  }

  applyMode(mode) {
    const darky = document.querySelector(".darky"); // the button for the dark mode
    const lighty = document.querySelector(".lighty"); // the button for the light mode
    const relaxy = document.querySelector(".relaxy"); // the button for the relax mode

    const body = document.querySelector(".jack"); // the targeting class for the body element
    const linkys = document.querySelectorAll(".link-to"); // the navbar buttons
    const bowtons = document.querySelectorAll(".bowton"); // the targeting class for the buttons on the mode bar
    const navis = document.querySelectorAll(".navi"); // the targeting class for the biggest div for the navigation bar
    const eyes = document.querySelectorAll(".eye"); // targeting class for the link_to elements
    const modus = document.querySelector(".modus"); // the targeting class for the biggest div of the mode bar
    const signy = document.querySelectorAll(".sign-in-out-target"); // the targeting class for the actual sign in and sign out link_to elements
    const bigSigny = document.querySelector(".sign-in-out-big"); // the targeting class for the sign in and signout component's biggest div

    const homey = document.querySelector(".home_info"); // the targeting class for the div that contains all the information about me
    const jay = document.querySelector(".joel_pina_colada"); // the targeting class for my picture on my home page

    // pages/showcase elements
    const showaichone = document.querySelector(".showcase-h1"); // the targeting class for the h1 in the pages/showcase view
    const caruselButtons = document.querySelectorAll(".carusel-buttons"); // the targeting class for the next and previous buttons on the pages/showcase view
    const carusel = document.querySelector(".carusel-big"); // The targeting class for the biggest div in the pages/showcase view
    const smallDiv = document.querySelector(".small-div"); // the targeting class for the div that contains all the weather info

    // pages/contact element
    const contactWindow = document.querySelector(".contact-big"); // the targeting class for the biggest div in the pages/contact view

    // devise related elements
    const register_new = document.querySelector(".devise-big"); // the targeting class for the biggest div in all the device related views
    const devise_Paths = ["/users/sign_up", "/users/sign_in", "/users/confirmation/new", "/users/edit", "/users/password/new"]; // the pathnames for all devise related views

    // chat/index elements
    const chatsies = document.querySelector(".chat-index-big"); // the targeting class for the biggest div in the chat/index view
    const chatSearchUser = document.querySelector(".user"); // the targeting class for the div that displays the search result for the user search in the chat/index view

    // chat/show element
    const chatsieShow = document.querySelector(".chat-show-big"); // the targeting class for the biggest div in the chat/show view
    const csDelete = document.querySelector(".chat-freind-delete"); // the target class for the delete chat in the chat/show view
    const csSubmit = document.querySelector(".formie-send"); // the target class for the submit button for the messgae form

    // 
    const links = document.querySelectorAll("#links");

    // removing all previous mode classes from elements that are always on the viewport when the js controller darkmode is triggered
    body.classList.remove("body", "body-two", "body-three", "jockey-one-regular");
    bowtons.forEach(bowton => bowton.classList.remove("navigation-knopfe", "navigation-knopfe-two", "navigation-knopfe-three", "titillium-web-regular"));
    navis.forEach(navi => navi.classList.remove("navigation-big", "navigation-big-two", "navigation-big-three"));
    linkys.forEach(link => link.classList.remove("lt", "lt-two", "lt-three"));
    eyes.forEach(eye => eye.classList.remove("navigation-i", "navigation-i-two", "navigation-i-three"));
    modus.classList.remove("big-mode", "big-mode-two", "big-mode-three");
    signy.forEach(element => element.classList.remove("sign-in-out-hover", "sign-in-out-hover-two", "sign-in-out-hover-three"));
    bigSigny.classList.remove("light_window", "dark_window", "relax_window");


    // removing all previous mode classes from all page-spacific classes depending on the view your'e on when the js controller darkmode is triggered

    // pages/root (the homepage)
    if (window.location.pathname === "/") {
      homey.classList.remove("dark_window", "light_window", "relax_window");

      // pages/showcase view
    } else if (window.location.pathname === "/showcase") {
      caruselButtons.forEach(caruselButton => caruselButton.classList.remove("prevnext", "prevnext-two", "prevnext-three"));
      showaichone.classList.remove("dark_window", "light_window", "relax_window");
      carusel.classList.remove("light_window", "relax_window", "dark_window");
      smallDiv.classList.remove("small_div_bg", "small_div_bg_two", "small_div_bg_three");

      // pages/contact view
    } else if (window.location.pathname === "/contact") {
      contactWindow.classList.remove("dark_window", "light_window", "relax_window");

      // any devise related view
    } else if (devise_Paths.includes(window.location.pathname)) {
      register_new.classList.remove("relax_window", "dark_window", "light_window");
      links.forEach(link => link.classList.remove("links-overwrite", "links-overwrite-two", "links-overwrite-three"));

      // chat/index view
    } else if (window.location.pathname === "/chats") {
      chatsies.classList.remove("light_window", "dark_window", "relax_window");
      chatSearchUser.classList.remove("user-light", "user-dark", "user-relax");

      // chat/show view
    } else if (/^\/chats\/\d+$/.test(window.location.pathname)) {
      chatsieShow.classList.remove("light_window", "dark_window", "relax_window");
      csDelete.classList.remove("csb-light", "csb-dark", "csb-relax");
      csSubmit.classList.remove("csb-light", "csb-dark", "csb-relax");
    }

    //code to change to dark, light, or relax mode

    // code to run for dark mode for elements from components that are always on the viewport
    if (mode === "dark") {
      body.classList.add("body-two", "titillium-web-regular");
      bowtons.forEach(bowton => bowton.classList.add("navigation-knopfe-two"));
      navis.forEach(navi => navi.classList.add("navigation-big-two"));
      darky.classList.add("show");
      lighty.classList.remove("show");
      relaxy.classList.remove("show");
      modus.classList.add("big-mode-two");
      linkys.forEach(link => link.classList.add("lt-two"));
      eyes.forEach(eye => eye.classList.add("navigation-i-two"));
      signy.forEach(element => element.classList.add("sign-in-out-hover-two"));
      bigSigny.classList.add("dark_window");

      // code to run for dark mode for all view spacific elements depending on which view you are on
      if (window.location.pathname === "/") {
        homey.classList.add("dark_window");
        jay.src = '/images/joel.jpg';
      } else if (window.location.pathname === "/showcase") {
        carusel.classList.add("dark_window");
        showaichone.classList.add("dark_window");
        smallDiv.classList.add("small_div_bg_two");
        caruselButtons.forEach(caruselButton => caruselButton.classList.add("prevnext-two"));
      } else if (window.location.pathname === "/contact") {
        contactWindow.classList.add("dark_window");
      } else if (devise_Paths.includes(window.location.pathname)) {
        register_new.classList.add("dark_window");
        links.forEach(link => link.classList.add("links-overwrite-two"));
      } else if (window.location.pathname === "/chats") {
        chatsies.classList.add("dark_window");
        chatSearchUser.classList.add("user-dark");
      } else if (/^\/chats\/\d+$/.test(window.location.pathname)) {
        chatsieShow.classList.add("dark_window");
        csDelete.classList.add("csb-dark");
        csSubmit.classList.add("csb-dark");
      }

      // code to run for light mode for elements from components that are always on the viewport
    } else if (mode === "light") {
      body.classList.add("body-three", "titillium-web-regular");
      bowtons.forEach(bowton => bowton.classList.add("navigation-knopfe-three"));
      navis.forEach(navi => navi.classList.add("navigation-big-three"));
      darky.classList.remove("show");
      lighty.classList.add("show");
      relaxy.classList.remove("show");
      modus.classList.add("big-mode-three");
      linkys.forEach(link => link.classList.add("lt-three"));
      eyes.forEach(eye => eye.classList.add("navigation-i-three"));
      signy.forEach(element => element.classList.add("sign-in-out-hover-three"));
      bigSigny.classList.add("light_window");

      // code to run for light mode for all view spacific elements depending on which view you are on
      if (window.location.pathname === "/") {
        homey.classList.add("light_window");
        jay.src = '/images/joel.jpg';
      } else if (window.location.pathname === "/showcase") {
        carusel.classList.add("light_window");
        showaichone.classList.add("light_window");
        smallDiv.classList.add("small_div_bg_three");
        caruselButtons.forEach(caruselButton => caruselButton.classList.add("prevnext-three"));
      } else if (window.location.pathname === "/contact") {
        contactWindow.classList.add("light_window");
      } else if (devise_Paths.includes(window.location.pathname)) {
        register_new.classList.add("light_window");
        links.forEach(link => link.classList.add("links-overwrite-three"));
      } else if (window.location.pathname === "/chats") {
        chatsies.classList.add("light_window");
        chatSearchUser.classList.add("user-light");
      } else if (/^\/chats\/\d+$/.test(window.location.pathname)) {
        chatsieShow.classList.add("light_window");
        csDelete.classList.add("csb-light");
        csSubmit.classList.add("csb-light");
      }

    // code to run for relax mode for all view spacific elements depending on which view you are on  
    } else if (mode === "relax") {
      body.classList.add("body", "jockey-one-regular");
      bowtons.forEach(bowton => bowton.classList.add("navigation-knopfe"));
      navis.forEach(navi => navi.classList.add("navigation-big"));
      darky.classList.remove("show");
      lighty.classList.remove("show");
      relaxy.classList.add("show");
      modus.classList.add("big-mode");
      linkys.forEach(link => link.classList.add("lt"));
      eyes.forEach(eye => eye.classList.add("navigation-i"));
      signy.forEach(element => element.classList.add("sign-in-out-hover"));
      bigSigny.classList.add("relax_window");

      // code to run for relax mode for elements from components that are always on the viewport
      if (window.location.pathname === "/") {
        homey.classList.add("relax_window");
        jay.src = '/images/joel_pina_colada.jpg';
      } else if (window.location.pathname === "/showcase") {
        carusel.classList.add("relax_window");
        showaichone.classList.add("relax_window");
        smallDiv.classList.add("small_div_bg");
        caruselButtons.forEach(caruselButton => caruselButton.classList.add("prevnext"));
      } else if (window.location.pathname === "/contact") {
        contactWindow.classList.add("relax_window");
      } else if (devise_Paths.includes(window.location.pathname)) {
        register_new.classList.add("relax_window");
        links.forEach(link => link.classList.add("links-overwrite"));
      } else if (window.location.pathname === "/chats") {
        chatsies.classList.add("relax_window");
        chatSearchUser.classList.add("user-relax");
      } else if (/^\/chats\/\d+$/.test(window.location.pathname)) {
        chatsieShow.classList.add("relax_window");
        csDelete.classList.add("csb-relax");
        csSubmit.classList.add("csb-relax");
      }
    }
  }
}
