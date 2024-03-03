const input = document.querySelector("#location");
const searchButton = document.querySelector(".searchButton");
const weatherToday = document.querySelector(".weatherToday");
const weatherTomorrow = document.querySelector(".weatherTomorrow");
const weatherDayAfterTomorrow = document.querySelector(
  ".weatherDayAfterTomorrow"
);
const linkToday = document.querySelector(".linkToday");
const linkTomorrow = document.querySelector(".linkTomorrow");
const linkDayAfterTomorrow = document.querySelector(".linkDayAfterTomorrow");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  clearScreen();
  weatherDataObj().then((obj) => display(obj));
});

const weatherDataObj = async function getWeather() {
  try {
    const respons = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=f5793d9a1dc240899c454904231007&q=${input.value}&days=3&aqi=no&alerts=no}`,
      { mode: "cors" }
    );
    const weatherData = await respons.json();

    const getWeatherData = async () => {
      const weatherForLocationToday = {
        cloud: {
          element: document.createElement("div"),
          data: await weatherData.current.condition.text,
          text: "Description: ",
        },
        chanceOfRain: {
          element: document.createElement("div"),
          data: await weatherData.current.feelslike_c,
          text: "Chance of rain (%): ",
        },
        humidity: {
          element: document.createElement("div"),
          data: await weatherData.current.humidity,
          text: "Humidity: ",
        },
        temperature: {
          element: document.createElement("div"),
          data: await weatherData.current.temp_c,
          text: "Temperature: ",
        },
        wind: {
          element: document.createElement("div"),
          data: await weatherData.current.wind_kph,
          text: "Wind (km/h): ",
        },
        icon: {
          element: document.createElement("img"),
          src: await weatherData.current.condition.icon,
        },
      };
      const weatherForLocationTomorrow = {
        cloud: {
          element: document.createElement("div"),
          data: await weatherData.forecast.forecastday["1"].day.condition.text,
          text: "Description: ",
        },
        chanceOfRain: {
          element: document.createElement("div"),
          data: await weatherData.forecast.forecastday["1"].day
            .daily_chance_of_rain,
          text: "Chance of rain (%): ",
        },
        humidity: {
          element: document.createElement("div"),
          data: await weatherData.forecast.forecastday["1"].day.avghumidity,
          text: "Humidity: ",
        },
        temperature: {
          element: document.createElement("div"),
          data: await weatherData.forecast.forecastday["1"].day.avgtemp_c,
          text: "Temperature: ",
        },
        wind: {
          element: document.createElement("div"),
          data: await weatherData.forecast.forecastday["1"].day.maxwind_kph,
          text: "Wind (max. km/h): ",
        },
        icon: {
          element: document.createElement("img"),
          src: await weatherData.forecast.forecastday["1"].day.condition.icon,
        },
      };
      const weatherForLocationDayAfterTomorrow = {
        cloud: {
          element: document.createElement("div"),
          data: await weatherData.forecast.forecastday["2"].day.condition.text,
          text: "Description: ",
        },
        chanceOfRain: {
          element: document.createElement("div"),
          data: await weatherData.forecast.forecastday["2"].day
            .daily_chance_of_rain,
          text: "Chance of rain (%): ",
        },
        humidity: {
          element: document.createElement("div"),
          data: await weatherData.forecast.forecastday["2"].day.avghumidity,
          text: "Humidity: ",
        },
        temperature: {
          element: document.createElement("div"),
          data: await weatherData.forecast.forecastday["2"].day.avgtemp_c,
          text: "Temperature: ",
        },
        wind: {
          element: document.createElement("div"),
          data: await weatherData.forecast.forecastday["2"].day.maxwind_kph,
          text: "Wind (max. km/h): ",
        },
        icon: {
          element: document.createElement("img"),
          src: await weatherData.forecast.forecastday["2"].day.condition.icon,
        },
      };
      return {
        weatherForLocationToday,
        weatherForLocationTomorrow,
        weatherForLocationDayAfterTomorrow,
      };
    };
    return { getWeatherData };
  } catch (error) {
    console.log(error);
  }
};

function display(obj) {
  obj.getWeatherData().then((weather) => {
    addAttributes(weather.weatherForLocationToday);
    addAttributes(weather.weatherForLocationTomorrow);
    addAttributes(weather.weatherForLocationDayAfterTomorrow);
    appendObjects(
      [
        weather.weatherForLocationToday.cloud.element,
        weather.weatherForLocationToday.chanceOfRain.element,
        weather.weatherForLocationToday.humidity.element,
        weather.weatherForLocationToday.temperature.element,
        weather.weatherForLocationToday.wind.element,
      ],
      weatherToday
    );
    appendObjects([weather.weatherForLocationToday.icon.element], linkToday);
    appendObjects(
      [
        weather.weatherForLocationTomorrow.cloud.element,
        weather.weatherForLocationTomorrow.chanceOfRain.element,
        weather.weatherForLocationTomorrow.humidity.element,
        weather.weatherForLocationTomorrow.temperature.element,
        weather.weatherForLocationTomorrow.wind.element,
        weather.weatherForLocationTomorrow.icon.element,
      ],
      weatherTomorrow
    );
    appendObjects(
      [weather.weatherForLocationTomorrow.icon.element],
      linkTomorrow
    );
    appendObjects(
      [
        weather.weatherForLocationDayAfterTomorrow.cloud.element,
        weather.weatherForLocationDayAfterTomorrow.chanceOfRain.element,
        weather.weatherForLocationDayAfterTomorrow.humidity.element,
        weather.weatherForLocationDayAfterTomorrow.temperature.element,
        weather.weatherForLocationDayAfterTomorrow.wind.element,
        weather.weatherForLocationDayAfterTomorrow.icon.element,
      ],
      weatherDayAfterTomorrow
    );
    appendObjects(
      [weather.weatherForLocationDayAfterTomorrow.icon.element],
      linkDayAfterTomorrow
    );
  });
}

function appendObjects(object, appendTo) {
  object.forEach((el) => {
    appendTo.append(el);
  });
}

function addAttributes(object) {
  for (const item in object) {
    if (object[item] === object["element"]) {
      continue;
    }
    for (const [key, value] of Object.entries(object[item])) {
      if (key === "element") {
        continue;
      } else if (key === "src") {
        object[item]["element"].setAttribute("src", value);
      } else {
        object[item]["element"].textContent =
          object[item]["text"] + object[item]["data"];
      }
    }
  }
}

function clearScreen() {
  const displayWeather = document.querySelectorAll(".displayWeather div");
  const linkWeather = document.querySelectorAll(".displayWeather a > img");
  displayWeather.forEach((e) => e.remove());
  linkWeather.forEach((e) => e.remove());
}
