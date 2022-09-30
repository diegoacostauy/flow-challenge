import {ChangeEvent, useEffect, useState} from "react";

import {api} from "./api";
import {City, Weather} from "./types";

const CITIES: Record<string, City> = {
  artigas: {
    id: "artigas",
    name: "Artigas",
    lat: -30.58333,
    lon: -57.0,
  },
  salto: {
    id: "salto",
    name: "Salto",
    lat: -31.38333,
    lon: -57.96667,
  },
  paysandu: {
    id: "paysandu",
    name: "Paysandu",
    lat: -32.32139,
    lon: -58.07556,
  },
  maldonado: {
    id: "maldonado",
    name: "Maldonado",
    lat: -34.9,
    lon: -54.95,
  },
  bariloche: {
    id: "bariloche",
    name: "Bariloche",
    lat: -41.1333,
    lon: -71.3103,
  },
};

function App() {
  const [status, setStatus] = useState<"pending" | "success">("pending");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [city, setCity] = useState<City>(Object.values(CITIES)[1]);

  const handleChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const city = ev.target.value as keyof typeof CITIES;

    setCity(CITIES[city]);
  };

  useEffect(() => {
    api.weather.list(city).then((res) => {
      setStatus("success");
      setWeather(res);
    });

    setStatus("success");
  }, [city]);

  if (status == "pending") return <p>Loading...</p>;

  if (!weather) return <p>La ciudad no existe o no hay datos del clima.</p>;

  return (
    <main>
      <h1>{weather.city.name}</h1>
      <form action="">
        <label htmlFor="cities">Ciudad</label>
        <select id="cities" name="cities" value={city?.id} onChange={handleChange}>
          {Object.values(CITIES).map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </form>
      <ul>
        {weather.forecast.map((forecast, idx) => (
          <li key={idx}>
            {forecast.date} Min: {forecast.min}, Max: {forecast.max}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
