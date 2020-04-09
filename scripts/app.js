const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {

    const { cityDetail, weather } = data;

    //update deatils template
    details.innerHTML = `
    <h5 class="my-3">${cityDetail.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    //update day/night images and icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // remove d-none class to show the weather of the entered city
    if (card.classList.contains('d-none'))
        card.classList.remove('d-none');
};

cityForm.addEventListener('submit', e => {
    // Prevent default reload action
    e.preventDefault();

    // Get city value from textbox
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update UI with the new city info
    forecast.updateCity(city)
        .then((data) => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
};