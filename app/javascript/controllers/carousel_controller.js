import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="carousel"
export default class extends Controller {
  static targets = ["previous", "next"]  // Targets for image divs, previous and next buttons

  connect() {
    console.log("Carousel controller connected");
    let activeCity = localStorage.getItem('activeCity');

    if (!activeCity) {
      this.fetchWeatherDataAutomatically(); // Automatically fetch weather when the page loads
    }
  }

  // Automatically fetch weather when the page loads
  async fetchWeatherDataAutomatically() {
    // Get the first city's data (for initial load, assuming it's the first city)
    const firstCity = document.querySelector(".carusel-img-div.one")?.dataset.city;
    const element = document.getElementById('weather-info');
    console.log("no activeCity yet");
    element.style.backgroundImage = "url('/images/miami_beach_carusel.jpg')";

    if (firstCity) {
      await this.fetchWeatherData(firstCity); // Fetch the weather for the first city
    }
  }

  next_and_previous(event) {
    const direction = event.target.dataset.button;  // Get whether 'next' or 'previous' button was clicked
    this.nextAndPrevious(direction); // Call the method to change images based on the direction
  }

  nextAndPrevious(direction) {
    const images = document.querySelectorAll(".carusel-img-div");  // Corrected query selector
    let activeCity = null;

    images.forEach(image => {
      if (direction === "next") {
        if (image.classList.contains("one")) {
          image.classList.add("flip-towards-back");
          image.classList.replace("one", "eight");
          setTimeout(() => {
            image.classList.remove("flip-towards-back");
          }, 1000);
        } else if (image.classList.contains("two")) {
          activeCity = image.dataset.city;  // Get the city of the current "active" image
          image.classList.replace("two", "one");
        } else if (image.classList.contains("three")) {
          image.classList.replace("three", "two");
        } else if (image.classList.contains("four")) {
          image.classList.replace("four", "three");
        } else if (image.classList.contains("five")) {
          image.classList.replace("five", "four");
        } else if (image.classList.contains("six")) {
          image.classList.replace("six", "five");
        } else if (image.classList.contains("seven")) {
          image.classList.replace("seven", "six");
        } else if (image.classList.contains("eight")) {
          image.classList.replace("eight", "seven");
        }
      }

      // Logic for Previous button
      else if (direction === "previous") {
        if (image.classList.contains("one")) {
          image.classList.replace("one", "two");
        } else if (image.classList.contains("two")) {
          image.classList.replace("two", "three");
        } else if (image.classList.contains("three")) {
          image.classList.replace("three", "four");
        } else if (image.classList.contains("four")) {
          image.classList.replace("four", "five");
        } else if (image.classList.contains("five")) {
          image.classList.replace("five", "six");
        } else if (image.classList.contains("six")) {
          image.classList.replace("six", "seven");
        } else if (image.classList.contains("seven")) {
          image.classList.replace("seven", "eight");
        } else if (image.classList.contains("eight")) {
          image.classList.add("flip-towards-front");
          activeCity = image.dataset.city;  // Get the city of the current "active" image
          image.classList.replace("eight", "one");
          setTimeout(() => {
            image.classList.remove("flip-towards-front");
          }, 1000);
        }
      }
    });

    // Now that the active city is determined it is sent to Rails to fetch the weather data
    if (activeCity) {
      this.fetchWeatherData(activeCity);
      const element = document.getElementById('weather-info');
      element.style.backgroundImage = `url('/assets/${activeCity}_carusel.jpg')`;
    }
  }

  // Function to make the API call to the Rails backend
  async fetchWeatherData(city) {
    try {
      const response = await fetch(`/get_weather?city=${city}`, {
        method: 'GET',
        headers: {
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content // Include CSRF token
        }
      });

      const data = await response.json();

      if (data.error) {
        console.error("Error fetching weather:", data.error);
      } else {
        this.displayWeatherInfo(data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  
  // Function to update the element that holds the api information with the fetched weather data
  displayWeatherInfo(weatherData) {
    const cityName = document.querySelector(".city-name");
    cityName.innerText = `${weatherData.city_name}`;
    const time = document.querySelector(".time");
    time.innerText = `Date: ${weatherData.date_time}`;
    const temperature = document.querySelector(".temperature");
    temperature.innerText = `Temperature: ${weatherData.temp}°C`;
    const minMax= document.querySelector(".min_max");
    minMax.innerText = `Highs & Lows: ${weatherData.max} / ${weatherData.min} °C`;
    const description = document.querySelector(".description");
    description.innerText = `Weather: ${weatherData.weather_description}`;
    const humidity = document.querySelector(".humidity");
    humidity.innerText = `Humidity: ${weatherData.humidity}%`;
    const pressure = document.querySelector(".pressure");
    pressure.innerText = `Pressure: ${weatherData.pressure} mbar`;
  }

  
}
