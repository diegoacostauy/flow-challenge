import {City, Weather} from "./types";

type RawWeather = {
  city: {
    id: number;
    name: string;
    coord: {
      lon: number;
      lat: number;
    };
    country: string;
    population: number;
    timezone: number;
  };
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    sunrise: number;
    sunset: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    speed: number;
    deg: number;
    gust: number;
    clouds: number;
    pop: number;
    rain?: number;
  }>;
};

function convertToCelsius(t: number) {
  return Math.round(t - 273.15);
}

export const api = {
  weather: {
    list: async (city: City): Promise<Weather> => {
      const req = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${city.lat}&lon=${
          city.lon
        }&appid=${import.meta.env.VITE_WEATHER_KEY}`,
      );

      const res: RawWeather = await req.json();

      const {0: first, 1: second, 2: third, 3: fourth, 4: fifth} = res.list;

      return {
        city: {
          id: city.id,
          name: city.name,
        },
        forecast: [first, second, third, fourth, fifth].map((forecast) => ({
          date: new Date(forecast.dt * 1000).toLocaleDateString("es-UY"),
          min: convertToCelsius(forecast.temp.min),
          max: convertToCelsius(forecast.temp.max),
        })),
      };
    },
  },
};
