// Getting all necessary elements
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


const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function dayOfTheWeek(day, month){
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return days[new Date(`${day} ,${month}`).getDay()] +', '+ months[new Date(`${month} ,${day}`).getMonth()];
}

const APIkey = '111dd2e8dc614eaaa84143103230504';

let cityInput='';
//Adding submit event to the form
form.addEventListener('submit', (e) =>{
    // If it's empty throw an alert
    if(search.value.length == 0){
        alert('Please type in a city name');
    }
    // Change default city to the one written in the input
    else{
        cityInput = search.value;
        WeatherData();
        search.value='';
    }
    e.preventDefault();
})

WeatherData();

// Function that fetches and displays data from the weather API
function WeatherData () {

    navigator.geolocation.getCurrentPosition((succes)=>{
        //console.log(succes);
        //Getting current location
        var yourCity='';
        let lat = succes.coords.latitude;
        let lon = succes.coords.longitude;        
        yourCity=lat+',' +lon;

        //If there was an input we will show weather for that city
        if(!cityInput==0){
            yourCity=cityInput;
        } 
        //fetching the weather API
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APIkey}&days=7&aqi=no&alerts=no&q=${yourCity}`).then(res=>res.json()).then(data =>{
            console.log(data)
            //yourCity='';
            //Getting current weather data from API and changing it in html
            currentCity.innerHTML = data.location.name;
            currentTemp.innerHTML = data.current.temp_c + '&#176;' + ' C';
            currentDesc.innerHTML = data.current.condition.text;
            currentWeatherIcon.src = data.current.condition.icon;
            currentFeelsLike.innerHTML = data.current.feelslike_c + '&#176;' + ' C';
            currentHumidity.innerHTML = data.current.humidity +  ' %';
            currentWindSpeed.innerHTML = data.current.wind_kph + ' km/h';
            
            const date = data.location.localtime;
            console.log(date);
            const m = parseInt(date.substr(5,2));
            const d = parseInt(date.substr(8,2));
            const hour = date.substr(11,2);
            const minute = date.substr(14);
            const militaryhours = hour >= 13 ? hour %12 : hour;
            const ampm = hour >=12 ? 'PM': 'AM';

            currentTime.innerHTML = `${militaryhours}:${minute} <span id="am-pm">${ampm}</span>`;
            currentDate.innerHTML = `${dayOfTheWeek(d , m )}  ${d}`;

            // Changing background for night time
            if(hour < 8 || hour > 19)
            {
                document.getElementById('body').style.backgroundImage='url("https://images.unsplash.com/photo-1632446628687-127cf068a522?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")'
            }
            
            //Getting forecast data from API 
            forecast.innerHTML=''
            data.forecast.forecastday.forEach((day,idx)=>
            {
                const epochDate=new Date(day.date_epoch *1000);
                forecast.innerHTML += 
                `<div class="weather-forecast">
                    <div class="day">${days[epochDate.getDay()]}</div>
                    <img src="${data.forecast.forecastday[idx].day.condition.icon}" alt="Weather icon" class="forecast_icon">
                    <div class="temp_day">${data.forecast.forecastday[idx].day.maxtemp_c}&#176; C</div>
                    <div class="temp_night">${data.forecast.forecastday[idx].day.mintemp_c}&#176; C</div>
                </div>`
            })
        })
    })
};
