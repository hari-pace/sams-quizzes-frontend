import React from "react";
import Pokeball from "../../assets/pokeball.png";
import Pokeballs from "../../assets/pokeballs.jpg";
import Globe from "../../assets/globe.png";
import World from "../../assets/world.png";
import { Link } from "react-router-dom";

const CountriesHomepage = () => {
  return (
    <>
      <body className="absolute top-0 left-0 w-full h-full">
        <div
          className="h-full pt-32"
          style={{
            backgroundImage: `url(${World})`,
          }}
        >
          <div className="h-24 -mt-8 mb-8 flex items-start justify-center sm:h-56 sm:mt-0 sm:mb-0">
            <img src={Globe} className="h-24 sm:h-40" />
          </div>
          <div className="bg-slate-100 max-w-3xl mx-auto pb-12 pt-8 border-2 rounded-xl">
            <div className="text-xl sm:text-3xl text-center p-8 mb-4 h-16 flex justify-center items-center mx-auto ">
              Flags but with a colourful twist - good luck!
            </div>
            <div className="text-md sm:text-md text-center p-8 mb-4 h-16 flex flex-col justify-center items-center mx-auto ">
              <p>⏭️ = no idea, skip to next</p>
              <p>🆘 = give me a hint (first letter of the country name)</p>
              <p>✅ = submit guess</p>
            </div>

            <div className="max-w-md mx-auto mt-16 sm:mt-8 rounded-xl shadow-lg flex flex-col justify-center">
              {/* <input
            className="ml-4 pl-4 pt-2 pb-2 shadow-lg rounded-xl border-2"
            type="text"
            id="username"
            placeholder="enter your username..."
            onChange={handleOnKeyPress}
          /> */}
              <Link
                to="/countries/play"
                className="flex justify-center h-12 border-2 shadow-lg rounded-xl bg-white text-slate hover:bg-slate-200 text-center duration-300 hover:transition-all hover:ease-in text-2xl"
              >
                <button>Play!</button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default CountriesHomepage;
