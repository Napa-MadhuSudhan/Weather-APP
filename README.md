# Weather Information App

## Overview

The Weather Information App provides users with current weather data for a specified city. It includes temperature readings, weather descriptions, and emojis to represent different weather conditions. The app also changes its theme based on the weather conditions, making the experience visually engaging. Also provide next  5 days weather forecast for the selected city.

## Features

- **Weather Information**: Displays current weather and temperature in Celsius and Fahrenheit.
- **Dynamic Theme**: Changes the background theme according to the weather condition (e.g., sunny, rainy, snowy).
- **City Suggestions**: Provides city suggestions as users type, using data from a pre-loaded JSON file.
- **Forecasting**: Proovides city next 5 days weather forecast.
- **Weather Emojis**: Displays appropriate emojis based on the weather condition.

## Files and Directories

- `index.html`: The main HTML file that sets up the structure of the app.
- `styles.css`: Contains styles for the app, including themes and layout adjustments.
- `scripts.js`: Handles functionality such as fetching weather data, displaying suggestions, and updating the UI based on weather conditions.
- `convert_csv_to_json.py`: A Python script to convert the `worldcities.csv` file to a `cities.json` file used for city suggestions.
- `worldcities.csv`: CSV file containing city and country information.
- `cities.json`: JSON file with city and country information generated from `worldcities.csv`.
- `images/`: Directory containing weather-related background images for different themes.

## Setup

1. **Install Dependencies**: Ensure you have Python installed to run the CSV to JSON conversion script.

2. **Convert CSV to JSON**:
   ```bash
   python convert_csv_to_json.py
   ```
   This will generate the `cities.json` file from `worldcities.csv`.

3. **Run the App**: Open `index.html` in your web browser to view and use the app.

## How to Use

1. Enter the name of a city into the input field.
2. The app will display a list of suggestions. Select a city from the suggestions or press the "Get Weather" button.
3. The weather information will be displayed along with an emoji and a background theme that corresponds to the weather.

## Customization

- **Weather Images**: Replace images in the `images/` folder to customize the look of different weather themes.
- **API Key**: Update the `apiKey` variable in `scripts.js` with your own OpenWeatherMap API key if needed.



## Contact

For any questions or feedback, please reach out to [madhusudhan.napa@outlook.com].
```

You can replace `[Your Email]` with your actual contact information and adjust any other details as needed.
