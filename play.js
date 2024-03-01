const input = document.querySelector("#location");
const searchButton = document.querySelector(".searchButton");
const weatherToday = document.querySelector(".weatherToday");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  weatherDataObj().then((obj) => display(obj));
});

const weatherDataObj = async function getWeather() {
  try {
    const respons = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=f5793d9a1dc240899c454904231007&q=${input.value}`,
      { mode: "cors" }
    );
    const weatherData = await respons.json();
    console.log(await weatherData);

    const getWeatherData = async () => {
      const weatherForLocation = {
        cloud: {
          element: document.createElement("div"),
          data: await weatherData.current.cloud,
          text: "Cloud: ",
        },
        feelsLike: {
          element: document.createElement("div"),
          data: await weatherData.current.feelslike_c,
          text: "Feels like: ",
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
          text: "Wind: ",
        },
      };
      return weatherForLocation;
    };
    return { getWeatherData };
  } catch (error) {
    console.log(error);
  }
};

function display(obj) {
  obj.getWeatherData().then((weather) => {
    weather.cloud.element.textContent = weather.cloud.text + weather.cloud.data;
    weatherToday.append(weather.cloud.element);
  });
}
