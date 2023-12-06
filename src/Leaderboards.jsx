import React from "react";
import { Link } from "react-router-dom";

const Leaderboards = () => {
  return (
    <>
      <div className="mt-24 sm:mt-40 mx-auto flex flex-col">
        <div className="text-3xl mx-2 text-center sm:text-6xl h-20 flex justify-center items-center sm:mx-auto sm:mb-16">
          Leaderboards
        </div>
        <div className="flex flex-col items-center">
          <Link
            to="/leaderboards/pokemon"
            className="w-2/3 sm:w-1/3 p-4 bg-slate-300 text-center mb-4 hover:w-1/3 hover:bg-slate-400 duration-300 hover:transition-all hover:ease-in border-4 rounded-lg"
          >
            151 original Pokemon
          </Link>
          <a
            href="#"
            className="w-2/3 sm:w-1/3 p-4 bg-slate-300  text-center mb-4 hover:w-1/3 hover:bg-slate-400 duration-300 hover:transition-all hover:ease-in border-4 rounded-lg"
          >
            Countries of the world
          </a>
          <a
            href="#"
            className="w-2/3 sm:w-1/3 p-4 bg-slate-300  text-center mb-4 hover:w-1/3 hover:bg-slate-400 duration-300 hover:transition-all hover:ease-in border-4 rounded-lg"
          >
            Game 3
          </a>
          <a
            href="#"
            className="w-2/3 sm:w-1/3 p-4 bg-slate-300  text-center mb-4 hover:w-1/3 hover:bg-slate-400 duration-300 hover:transition-all hover:ease-in border-4 rounded-lg"
          >
            Game 4
          </a>
        </div>
      </div>
    </>
  );
};

export default Leaderboards;
