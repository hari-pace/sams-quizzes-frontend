import React from "react";
import { Link } from "react-router-dom";
import QuestionMark from "./assets/question3.jpg";

const Leaderboards = () => {
  return (
    <>
      <body
        className="absolute top-0 left-0 w-full h-full bg-cover"
        style={{
          backgroundImage: `url(${QuestionMark})`,
        }}
      >
        <div className="mt-24 sm:mt-40 mx-auto flex flex-col">
          <div className="text-3xl mx-2 text-center sm:text-6xl h-20 flex justify-center items-center sm:mx-auto sm:mb-16">
            Leaderboards
          </div>
          <div className="flex flex-col items-center">
            <Link
              to="/leaderboards/pokemon"
              className="flex items-center justify-center w-2/3 h-16 sm:h-20 sm:w-1/3 p-4 bg-slate-300 text-center mb-4 hover:w-1/3 hover:bg-slate-400 duration-300 hover:transition-all hover:ease-in border-4 rounded-lg hover:bg-button-hover-pokemon hover:scale-105 font-bold hover:text-slate-100"
            >
              151 original Pokemon
            </Link>
            <Link
              to="/leaderboards/countries"
              className="flex items-center justify-center w-2/3 h-16 sm:h-20 sm:w-1/3 p-4 bg-slate-300 text-center mb-4 hover:w-1/3 hover:bg-slate-400 duration-300 hover:transition-all hover:ease-in border-4 rounded-lg hover:bg-button-hover-countries hover:scale-105 font-bold hover:text-slate-100"
            >
              Countries of the world
            </Link>
            <a
              href="#"
              className="flex items-center justify-center w-2/3 h-16 sm:h-20 sm:w-1/3 p-4 bg-slate-300 text-center mb-4 hover:w-1/3 hover:bg-slate-400 duration-300 hover:transition-all hover:ease-in border-4 rounded-lg  hover:scale-105 font-bold hover:text-slate-100"
            >
              Game 3
            </a>
            <a
              href="#"
              className="flex items-center justify-center w-2/3 h-16 sm:h-20 sm:w-1/3 p-4 bg-slate-300 text-center mb-4 hover:w-1/3 hover:bg-slate-400 duration-300 hover:transition-all hover:ease-in border-4 rounded-lg  hover:scale-105 font-bold hover:text-slate-100"
            >
              Game 4
            </a>
          </div>
        </div>
      </body>
    </>
  );
};

export default Leaderboards;
