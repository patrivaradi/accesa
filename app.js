const currentCity = document.getElementById('city');
const currentDate = document.getElementById('date');
const currentTime = document.getElementById('time');
const currentTemp = document.getElementById('temp');
const currentDesc = document.getElementById('winfo');
const currentDetails= document.getElementById('details');
const forecast = document.getElementById('forecast');

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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
