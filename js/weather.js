function onGeoWork(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${globalVariable.api}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        const htmlWeather = document.querySelector("#weather span:first-child");
        const htmlCity = document.querySelector("#weather span:last-child");
        htmlCity.innerText = data.name;
        htmlWeather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });

}

function onGeoError() {
    alert("Geo is Error! No weather for you..");
}

navigator.geolocation.getCurrentPosition(onGeoWork, onGeoError);