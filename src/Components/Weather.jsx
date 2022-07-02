import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {

    const [data, setData] = useState({})
    const [temperature, setTemperature] = useState(0)
    const [isCelsius, setIsCelsius] = useState(true)

    useEffect(() => {

        const success = pos => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=352492e8d4a7efe140d5c18e050458c2`)
          .then(res => {
            setData(res.data)
            setTemperature(Math.floor(res.data.main?.temp - 273.15))
          });
        }
        navigator.geolocation.getCurrentPosition(success);
    }, [])

    const convertTemperature = () =>{
        if(isCelsius){
            setTemperature(Math.floor(temperature * (9/5) + 32))
            setIsCelsius(false)
        }else{
            setTemperature(Math.floor((temperature -32) * 5/9))
            setIsCelsius(true)
        }
    }

    return (
        <div>
            <h1>Weather App</h1>
            <div className="card">
                <h1>{data.name}, {data.sys?.country}</h1>
                <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="Weather Icon" />
                <h2>{data.weather?.[0].main} | {data.weather?.[0].description}</h2>
                <p><b>Wind Speed: </b>{data.wind?.speed} m/s</p>
                <p><b>Clouds: </b>{data.clouds?.all}%</p>
                <p><b>Degrees: </b>{temperature}° {isCelsius ? "Celsius" : "Fahrenheit"}</p>
                <button onClick={convertTemperature}>Degrees °C/°F</button>
            </div>
        </div>
    );
};

export default Weather;