
import 'dotenv/config'
import axios from 'axios';
import Result from "./Result";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BiCopyright } from "react-icons/bi";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const locations = [
  "brooklyn",
  "alaska",
  "louisville",
  "abuja",
  "lagos",
  "ondo",
];

const App = () => {
  const [loading, setLoading] = useState(true);
  const [weatherList, setWeatherList] = useState([]);
  const [inputValue, setInputVal] = useState("");
  const [validInput, setValidInput] = useState("");
  const [locationList, setLocationList] = useState(locations);

  useEffect(() => {
    locationList.forEach((location) => getWeatherData(location));
    setLoading(false);
  }, [locationList]);

  const getWeatherData = async (location) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=metric`
    )
    const data = response.data
    if (data.cod !== "404") {
      setWeatherList((prev) => [
        {
          name: data.name,
          country: data.sys.country,
          icon: data.weather[0].icon,
          temp: data.main.temp,
          description: data.weather[0].description,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          windspeed: data.wind.speed,
          id: data.id,
        },
        ...prev,
      ]);
    } else {
      setValidInput("invalid input");
    }
    setInputVal("");
  };

  const RenderResults = () => {
    return !loading ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
        {weatherList.map((weatherItem) => (
          <Result
            key={weatherItem.id}
            name={weatherItem.name}
            country={weatherItem.country}
            icon={weatherItem.icon}
            temp={weatherItem.temp}
            description={weatherItem.description}
            pressure={weatherItem.pressure}
            humidity={weatherItem.humidity}
            windspeed={weatherItem.windspeed}
          />
        ))}
      </div>
    ) : (
      <div className='h-[50vh] grid place-content-center'>
        <div
          className='w-[30px] h-[30px] rounded-full bg-violet-300 animate-ping'
        ></div>
      </div>
    );
  };

  const validateInput = () => {
    if (!inputValue) {
      setValidInput("field cannot be empty");
    } else if (locations.includes(inputValue)) {
      setValidInput("data for input already exists");
    } else {
      setLocationList([inputValue]);
      locations.push(inputValue);
      setValidInput("");
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-12 pt-8">
      <h1 className="mb-12 bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-violet-500 text-5xl text-center ">
        Get weather data for 'any' city or country
      </h1>
      <form
        className="mb-8 flex flex-col md:flex-row gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          validateInput();
        }}
      >
        <div className="w-[95%] md:w-1/2 lg:w-4/12">
          <input
            placeholder="name (e.g london)"
            className={`rounded-3xl w-full px-7 py-3 text-lg self-start ${
              validInput && "border-red-600 border-2"
            }`}
            type="text"
            value={inputValue}
            onChange={(e) =>
              setInputVal(
                e.target.value
                  .replace(/[\s\d!@#$%^&*()_+-=~]/g, "")
                  .toLowerCase()
              )
            }
          />
          {validInput && (
            <motion.p
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              className="text-center md:text-left py-1 px-4 text-red-600"
            >
              {validInput}
            </motion.p>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 max-w-[150px] self-center md:self-start"
          type="submit"
        >
          Search
        </motion.button>
      </form>
      {RenderResults()}
      <footer className="flex text-2xl sm:text-3xl justify-center items-center gap-4 sm:gap-7 py-9">
        <p className="flex items-center">
          <BiCopyright /> Paul Aromolaran
        </p>
        <a target="_blank" href="https://github.com/PaulAroo">
          <BsGithub />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/paul-aroo">
          <BsLinkedin />
        </a>
      </footer>
    </div>
  );
};

export default App;
