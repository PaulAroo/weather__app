import { motion } from "framer-motion";

const Result = ({
  name,
  country,
  temp,
  icon,
  description,
  pressure,
  humidity,
  windspeed,
}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1, opacity: [0, 0, 0, 0.3, 1] }}
      transition={{ duration: 1 }}
      className="bg-slate-300 rounded-3xl py-4 px-4 sm:px-8 grid"
    >
      <div className="flex items-center">
        <h1 className=" text-3xl">
          {name}, {country}
        </h1>
        <img
          src={`http://openweathermap.org/img/w/${icon}.png`}
          alt="weather icon"
        />
      </div>
      <div className="text-center mt-6 mb-12">
        <p className="text-7xl">{Math.ceil(temp)}°C</p>
        <p className="capitalize">{description}</p>
      </div>
      <div className="max-w-[370px] flex text-center justify-self-center">
        <p>
          Pressure <span className="font-bold">{pressure}hPa</span>
        </p>
        <p>
          Humidity <span className="font-bold">{humidity}%</span>
        </p>
        <p>
          Windspeed <span className="font-bold">{windspeed}m/s</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Result;
