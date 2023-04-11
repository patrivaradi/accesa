const currentCity = document.getElementById('city');
const currentDate = document.getElementById('date');
const currentTime = document.getElementById('time');
const currentTemp = document.getElementById('temp');
const currentDesc = document.getElementById('winfo');
const currentWeatherIcon = document.getElementById('icon');
const currentFeelsLike= document.getElementById('feels-like');
const currentHumidity= document.getElementById('humidity');
const currentWindSpeed= document.getElementById('wind-speed');
const forecast = document.getElementById('forecast');
const form = document.getElementById('location_input');
const search = document.querySelector('.search');
const submit = document.querySelector('.submit');


const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const APIkey = '111dd2e8dc614eaaa84143103230504';
// Showing the right date and time
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const militaryhours = hour >= 13 ? hour %12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM': 'AM';
    
    currentTime.innerHTML = `${militaryhours}:${minutes} <span id="am-pm">${ampm}</span>`;
    
    currentDate.innerHTML = `${days[day]}, ${date}  ${months[month]}`
},1000);
//--------------------------------------------------
//Adding submit event to the <form>
form.addEventListener('submit', (e) =>{
    if(search.value.length == 0){
        alert('Please type in a city name');
    }
    else{
        city
    }
})

// Getting data from the weather API
function WeatherData () {
    navigator.geolocation.getCurrentPosition((succes)=>{
        console.log(succes);
        let {latitude, longitude} = succes.coords;
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIkey}&days=7&aqi=no&alerts=no&q=${latitude},${longitude}`).then(res=>res.json()).then(data =>{
            console.log(data)
            currentTemp.innerHTML = data.current.temp_c + '&#176;' + ' C';
            currentDesc.innerHTML = data.current.condition.text;
            currentWeatherIcon.src = data.current.condition.icon;
            currentFeelsLike.innerHTML = data.current.feelslike_c + '&#176;' + ' C';
            currentHumidity.innerHTML = data.current.humidity +  ' %';
            currentWindSpeed.innerHTML = data.current.wind_kph + ' km/h';
            
            

            forecast.innerHTML=''
            data.forecast.forecastday.forEach((day,idx)=>
                {//console.log(day)
                    const epochDate=new Date(data.forecast.forecastday[idx].date_epoch *1000);
                    forecast.innerHTML += 
                    `
                    <div class="weather-forecast">
                        <div class="day">${days[epochDate.getDay()]}</div>
                        <img src="${data.forecast.forecastday[idx].day.condition.icon}" alt="Weather icon" class="forecast_icon">
                        <div class="temp_day">${data.forecast.forecastday[idx].day.maxtemp_c}&#176; C</div>
                        <div class="temp_night">${data.forecast.forecastday[idx].day.mintemp_c}&#176; C</div>
                    </div>
                    `
                })
            

        })
    })
};
WeatherData();