import { useEffect, useState } from "react";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [isFarenheit, setIsFarenheit] = useState(true);
  const [loading, setLoading] = useState(false);

  const tempFarenheit = ((weather.main?.temp - 273.15) * 1.8 + 32).toFixed(2);
  const celcius = ((tempFarenheit - 32) / 1.8).toFixed(2);

  useEffect(() => {
    // Loading
    setLoading(true);
    function success(pos) {
      const crd = pos.coords;

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=c48e4696df226f8e58ad685c6f61f3ab`
        )
        .then((res) => {
          setWeather(res.data);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        });
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  //console.log(weather);

  return (
    <div
      className="loader"
      style={loading ? { background: "#fff" } : { background: "none" }}
    >
      {loading ? (
        <RingLoader color={"#9932cc"} loading={loading} size={150} />
      ) : (
        <header>
          <div className="card">
            <h1 className="title">Weather App</h1>
            <h3>
              {weather.name}, {weather.sys?.country}
            </h3>

            <section className="weather-info">
              <article className="weather-image-container">
                <img
                  className="weather-img"
                  src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
                />
                <h3 className="temperature">
                  {isFarenheit ? tempFarenheit : celcius}{" "}
                  {isFarenheit ? "°F" : "°C"}
                </h3>
              </article>

              <article className="weather-texts">
                <p className="weather-des">
                  {weather.weather?.[0].description}
                </p>
                <p>
                  <i className="bx bx-wind"></i> Wind speed:{" "}
                  <span className="black-color">{weather.wind?.speed} m/s</span>
                </p>
                <p>
                  <i className="bx bxs-cloud"></i> Clouds:{" "}
                  <span className="black-color">{weather.clouds?.all}%</span>
                </p>
                <p>
                  <i className="bx bx-test-tube"></i> Pressure:{" "}
                  <span className="black-color">
                    {weather.main?.pressure} mb
                  </span>
                </p>
              </article>
            </section>

            <button
              onClick={() => setIsFarenheit(!isFarenheit)}
              className="change-temp"
            >
              Degress °F/°C
            </button>
          </div>
        </header>
      )}
    </div>
  );
};

export default Weather;
