import {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";

import {api} from "./api";
import {City, Weather} from "./types";

const CITIES: Record<string, City> = {
  artigas: {
    id: "artigas",
    name: "Artigas",
    lat: 0,
    lon: 0,
  },
  salto: {
    id: "salto",
    name: "Salto",
    lat: 0,
    lon: 0,
  },
  paysandu: {
    id: "paysandu",
    name: "Paysandu",
    lat: 0,
    lon: 0,
  },
  maldonado: {
    id: "maldonado",
    name: "Maldonado",
    lat: 0,
    lon: 0,
  },
  montevideo: {
    id: "montevideo",
    name: "Montevideo",
    lat: 0,
    lon: 0,
  },
};

function App() {
  const [status, setStatus] = useState<"pending" | "success">("pending");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [city, setCity] = useState<City>(Object.values(CITIES)[0]);

  const handleChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const city = ev.target.value as keyof typeof CITIES;

    setCity(CITIES[city]);
  };

  useEffect(() => {
    api.weather.list(city).then((res) => {
      setStatus("success");
      setWeather(res);
    });
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
            Min: {forecast.min}, Max: {forecast.max}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
