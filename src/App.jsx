import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Leaderboards from "./Leaderboards";
import PokemonHomepage from "./components/pokemoncomponents/PokemonHomepage";
import PokemonLeaderboard from "./components/pokemoncomponents/PokemonLeaderboard";
import PokemonQuiz from "./components/pokemoncomponents/PokemonQuiz";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import "./App.css";

function App() {
  const [currentUserPokemon, setCurrentUserPokemon] = useState();
  const [tempUserPokemon, setTempUserPokemon] = useState();
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              setCurrentUserPokemon={setCurrentUserPokemon}
              setTempUserPokemon={setTempUserPokemon}
              tempUserPokemon={tempUserPokemon}
            />
          }
        />
        <Route path="/pokemon" element={<PokemonHomepage />} />
        <Route
          path="/pokemon/play"
          element={
            <PokemonQuiz
              setCurrentUserPokemon={setCurrentUserPokemon}
              currentUserPokemon={currentUserPokemon}
            />
          }
        />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/leaderboards/pokemon" element={<PokemonLeaderboard />} />
      </Routes>
    </>
  );
}

export default App;
