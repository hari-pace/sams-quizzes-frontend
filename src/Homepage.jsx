import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import PokemonHomepage from "./components/pokemoncomponents/PokemonHomepage";

const Homepage = ({
  setCurrentUserPokemon,
  tempUserPokemon,
  setTempUserPokemon,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOnKeyPress = (e) => {
    console.log(e.target.value);
    setTempUserPokemon(e.target.value);
  };
  const storeCurrentUsername = () => {
    console.log(tempUserPokemon);
    setCurrentUserPokemon(tempUserPokemon);
    closeModal();
  };

  return (
    <>
      <div className=" max-w-3xl mt-24 sm:mt-40 mx-auto flex flex-col">
        <div className="text-3xl mx-2 text-center sm:text-6xl h-20 flex justify-center items-center sm:mx-auto ">
          Welcome to Sam's Quizzes
        </div>
        <div className="text-l text-center mx-8 mt-2 flex items-center sm:text-2xl h-16 sm:mx-auto sm:mt-4 ">
          Making things a little bit more difficult for the King of Quizzes...
        </div>
        <div
          className="text-sm text-center mx-8 mb-8 flex items-center justify-center sm:text-lg h-8 sm:mx-auto sm:mt-4 text-slate-500 hover:text-blue-700 cursor-pointer"
          onClick={openModal}
        >
          Not Sam? Click here to set your username
        </div>
      </div>

      <div className="flex flex-col items-center ">
        <Link
          to="/pokemon"
          className="w-2/3 sm:w-1/3 p-4 bg-slate-300 text-center mb-4 hover:w-1/3 hover:bg-slate-400 duration-300 hover:transition-all hover:ease-in border-4 rounded-lg"
        >
          151 original Pokemon
        </Link>
        <a
          href="#"
          className="w-2/3 sm:w-1/3 p-4 bg-slate-300  text-center mb-4 hover:w-1/3 hover:bg-slate-400 duration-300 hover:transition-all hover:ease-in border-4 rounded-lg"
        >
          Link 2
        </a>
        <a
          href="#"
          className="w-2/3 sm:w-1/3 p-4 bg-slate-300  text-center mb-4 hover:w-1/3 hover:bg-slate-400 duration-300 hover:transition-all hover:ease-in border-4 rounded-lg"
        >
          Link 3
        </a>
        <a
          href="#"
          className="w-2/3 sm:w-1/3 p-4 bg-slate-300  text-center mb-4 hover:w-1/3 hover:bg-slate-400 duration-300 hover:transition-all hover:ease-in border-4 rounded-lg"
        >
          Link 4
        </a>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75">
          <div className="flex items-center justify-center h-screen">
            {/* Modal Content */}
            <div className="bg-white p-8 rounded shadow-lg">
              <div className="text-center">Please enter your username</div>
              <button
                onClick={closeModal}
                className="mt-4  hover:bg-gray-200 text-white font-bold py-2 px-4 rounded"
              >
                🔙
              </button>
              <input
                className="w-3/5 mx-2 pl-4 pt-2 pb-2 shadow-lg rounded-xl border-2"
                type="text"
                id="username"
                placeholder="e.g. Samander"
                onChange={handleOnKeyPress}
              />
              {/* Close Button */}
              <button
                onClick={storeCurrentUsername}
                className="mt-4  hover:bg-gray-200 text-white font-bold py-2 px-4 rounded"
              >
                ✅
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;
