class PagesController < ApplicationController
  include HTTParty

  before_action :initialize_cities

  def home
  end

  def contact
  end

  def showcase
    # Render the showcase page, no need to fetch weather data here
  end

  def get_weather
    city = params[:city]  # Get the city from the frontend (Stimulus controller or JavaScript)

    # Find the city data from the static list (or use a database if needed)
    city_data = @cities.find { |cityone| cityone[:name].downcase == city.downcase }

    if city_data
      lat = city_data[:lat]
      lon = city_data[:lon]
      weather_data = fetch_weather_data(lat, lon)
      
      if weather_data[:error]
        render json: { error: weather_data[:error] }, status: 400
      else
        render json: weather_data  # Send the weather data back to the frontend
      end
    else
      render json: { error: "City not found" }, status: 404
    end
  end

  private

  def initialize_cities
    # Static list of cities with their coordinates
    @cities = [
      { name: 'Miami_Beach', lat: 25.7617, lon: -80.1918 },
      { name: 'Los_Angeles', lat: 34.0522, lon: -118.2437 },
      { name: 'Grand_Bahamas', lat: 25.0343, lon: -77.3963 },
      { name: 'Mallorca_Callador', lat: 39.3919, lon: 3.2036 },
      { name: 'Hawaii_Oahu', lat: 21.3069, lon: -157.8583 },
      { name: 'Phuket', lat: 7.8804, lon: 98.3923 },
      { name: 'Bora_Bora', lat: -16.5004, lon: -151.7415 },
      { name: 'Lübeck', lat: 53.8655, lon: 10.6866 }
    ]
  end

  def fetch_weather_data(lat, lon)
    api_key = ENV['OPENWEATHERMAP_API_KEY']
    url = "https://api.openweathermap.org/data/2.5/forecast?lat=#{lat}&lon=#{lon}&appid=#{api_key}&units=metric"
    
    begin
      response = HTTParty.get(url, verify: false)  # Enabling SSL verification (recommended)

      if response.success?
        data = response.parsed_response

        # Extracting the first forecast entry from the "list" array
        forecast = data["list"].first  # This gets the first forecast entry

        # Now you can extract the temperature, weather description, etc.
        weather_info = {
          city_name: data["city"]["name"],
          country: data["city"]["country"],
          temp: forecast["main"]["temp"],  # Temperature in Celsius
          feels_like: forecast["main"]["feels_like"],  # Feels like temperature
          weather_description: forecast["weather"].first["description"],  # Weather description
          humidity: forecast["main"]["humidity"],  # Humidity
          wind_speed: forecast["wind"]["speed"],  # Wind speed
          clouds: forecast["clouds"]["all"],  # Cloud coverage in percentage
          date_time: forecast["dt_txt"],  # Forecast date and time
          pressure: forecast["main"]["pressure"], # Pressure in mbar
          min: forecast["main"]["temp_min"], # Minimum Temperature in celcius
          max: forecast["main"]["temp_max"] # Maximum Temperature in celcius
        }
        return weather_info
      else
        return { error: "Unable to fetch weather data" }
      end
    rescue StandardError => e
      # Log the error and return a user-friendly message
      Rails.logger.error("Weather API request failed: #{e.message}")
      return { error: "Weather service is temporarily unavailable" }
    end
  end
end
