import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios'

function App() {
  
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

      // função responsável por chamar a api
  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: "pt",
        units: 'metric'
      }
    });
    setWeather(res.data)
    
  }

  useEffect (() => {
    // solicitando autorização para localização
    navigator.geolocation.getCurrentPosition((position)=>{
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)

    })
  }, [])

  if (location == false ) {
    return (
      <Fragment>
        Você precisa habilitar a localização.
      </Fragment>
    ) } else if(weather== false) {
      return (
        <Fragment>
          Carregando o Clima
        </Fragment>
      )
    } else {
          return (
            <Fragment>
              <h3>
                Clima em sua região ({weather ['weather'][0]['description']})
              </h3>
                <hr />
                  <ul>
                    <li>Temperatura atual: {weather['main']['temp']}°</li>
                    <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
                    <li>Temperatura minima: {weather['main']['temp_min']}°</li>
                    <li>Pressão: {weather['main']['pressure']}hpa</li>
                    <li>Umidade: {weather['main']['humidiity']}%</li>
                  </ul>
            </Fragment>
          );
  }
  }

  

export default App;
