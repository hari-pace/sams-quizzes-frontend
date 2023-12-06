import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Leaderboards from "./Leaderboards";
import PokemonHomepage from "./components/pokemoncomponents/PokemonHomepage";
import PokemonLeaderboard from "./components/pokemoncomponents/PokemonLeaderboard";
import PokemonQuiz from "./components/pokemoncomponents/PokemonQuiz";
import CountriesHomepage from "./components/countriescomponents/CountriesHomepage";
import CountriesQuiz from "./components/countriescomponents/CountriesQuiz";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [tempUser, setTempUser] = useState();
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              setCurrentUser={setCurrentUser}
              setTempUser={setTempUser}
              tempUser={tempUser}
            />
          }
        />
        <Route path="/pokemon" element={<PokemonHomepage />} />
        <Route path="/countries" element={<CountriesHomepage />} />
        <Route
          path="/pokemon/play"
          element={
            <PokemonQuiz
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/countries/play"
          element={
            <CountriesQuiz
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
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
