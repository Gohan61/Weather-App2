const input = document.querySelector("#location");
const searchButton = document.querySelector(".searchButton");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather();
});

async function getWeather() {
  try {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=11111111111111111&q=${input.value}`,
      { mode: "cors" }
    )
      .then((respons) => respons.json())
      .then((response) => {
        console.log(response);
      });
  } catch (error) {
    console.log(error);
  }
}
