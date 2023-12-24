import React, { useEffect, useState } from "react";
import Pokeball from "../../assets/pokeball.png";
import Pokeballs from "../../assets/pokeballs.jpg";
import { Link } from "react-router-dom";

const Quiz = ({ currentUser }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userGuess, setUserGuess] = useState("");
  const [points, setPoints] = useState(0);
  const [skips, setSkips] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [pokemonsWithBlur, setPokemonsWithBlur] = useState([]);
  const [hasGuessedLastPokemon, setHasGuessedLastPokemon] = useState(false);
  const [showScorePokemon, setShowScorePokemon] = useState(false);

  const getPokemon = async () => {
    try {
      const res = await fetch(
        "https://pokefight-backend-cbka.onrender.com/pokemon"
      );
      const data = await res.json();
      setPokemons(data.slice(0, 151));
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []); // Only fetch Pokemon data once when the component mounts

  useEffect(() => {
    if (pokemons.length > 0) {
      // Shuffle and set initial state when pokemons data is available
      const shuffledPokemons = [...pokemons].sort(() => Math.random() - 0.5);
      console.log(shuffledPokemons);
      setPokemonsWithBlur(
        shuffledPokemons.map((pokemon) => ({ ...pokemon, blurred: true }))
      );
    }
  }, [pokemons]);

  useEffect(() => {
    // Check if the user has guessed the last Pokémon and execute the action
    if (hasGuessedLastPokemon) {
      // Perform the action you want after the user has guessed the last Pokémon
      console.log("User guessed the last Pokémon!");
      // Optionally, you can render new information or trigger some other behavior
      addUser();
      setShowScorePokemon(true);
      // Reset the hasGuessedLastPokemon state for the next round or action
      setHasGuessedLastPokemon(false);
    }
  }, [hasGuessedLastPokemon]);

  const addUser = async () => {
    console.log("updateUser triggered");
    const response = await fetch(
      "https://sams-quizzes.onrender.com/leaderboard/pokemon/pokemon",
      {
        method: "POST",
        body: JSON.stringify({
          username: currentUser?.length > 0 ? currentUser : "Sam",
          score: points,
          wrongGuesses: wrongGuesses,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    );
    const winData = await response.json();
    console.log(winData);
  };

  const currentPokemon = pokemonsWithBlur[currentPokemonIndex];

  const handleGuessSubmit = () => {
    // Check if the user's guess matches the current Pokemon's name
    if (
      currentPokemon.name.english.toLowerCase() === userGuess.toLowerCase() ||
      (currentPokemon.name.english.includes("Nidoran") &&
        userGuess.toLowerCase().includes("nidoran"))
    ) {
      // If correct, unblur the image, show success message, and add a point
      alert("Correct guess! You earned a point.");
      setPoints(points + 1);

      // Update the state to unblur the guessed Pokemon
      setPokemonsWithBlur((prevPokemons) =>
        prevPokemons.map((pokemon, index) =>
          index === currentPokemonIndex
            ? { ...pokemon, blurred: false }
            : pokemon
        )
      );

      if (currentPokemonIndex === 150) {
        setHasGuessedLastPokemon(true);
      }

      // Move to the next Pokemon after a delay
      const timeout = setTimeout(() => {
        setCurrentPokemonIndex((prevIndex) => prevIndex + 1);
        setUserGuess("");
      }, 3000);

      return () => clearTimeout(timeout);
    } else {
      // If incorrect, provide feedback (you can customize this part)
      alert("Incorrect guess. Try again!");
      setWrongGuesses(wrongGuesses + 1);
      setUserGuess("");
    }
  };

  const handleSkip = () => {
    // Move to the next Pokemon

    setSkips(skips + 1);
    setPokemonsWithBlur((prevPokemons) =>
      prevPokemons.map((pokemon, index) =>
        index === currentPokemonIndex ? { ...pokemon, blurred: false } : pokemon
      )
    );
    if (currentPokemonIndex === 150) {
      console.log("skipped the last pokemon");
      setHasGuessedLastPokemon(true);
    }
    // Clear the input field after submission
    // const timeout = setTimeout(() => {
    setCurrentPokemonIndex((prevIndex) => prevIndex + 1);
    setUserGuess("");
    // }, 3000);
  };

  const handleHintClick = () => {
    // Show the first letter of the Pokemon's name as a hint
    alert(
      `Hint: The first letter of the Pokemon's name is "${currentPokemon.name.english.charAt(
        0
      )}".`
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Prevent the default Enter key behavior (e.g., form submission)
      event.preventDefault();

      // Trigger the click event of the associated button
      document.getElementById("guessButton").click();
    }
  };

  return (
    <>
      <body
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url(${Pokeballs})`,
          height: "800px",
        }}
      >
        {loading ? (
          <img
            src={Pokeball}
            className="h-40 animate-spin mx-auto my-80"
            alt="loading-spinner"
          />
        ) : (
          <>
            <div
              style={{
                display: !showScorePokemon ? "block" : "none",
              }}
              className="mx-auto w-full max-w-6xl pt-4 sm:pt-4"
            >
              {pokemonsWithBlur?.map((pokemon, index) => (
                <div
                  key={pokemon.id}
                  style={{
                    display: index === currentPokemonIndex ? "block" : "none",
                  }}
                  className="bg-slate-100 border-2 my-24 p-12 w-full flex flex-col items-center shadow-lg rounded-xl"
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt="pokemon-img"
                    className={
                      pokemon.blurred
                        ? "mx-auto h-56 w-auto brightness-0 blur-md sm:h-72"
                        : "mx-auto h-56 w-auto sm:h-72"
                    }
                  />
                  <div className="flex flex-col items-center ">
                    <input
                      type="text"
                      className="h-10 w-64 pl-4 shadow-lg rounded-xl"
                      value={userGuess}
                      onChange={(e) => setUserGuess(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <div className="flex ">
                      <button
                        className="w-16 h-12 text-xl bg-white border-2 mt-4 p-1.5 shadow-lg rounded-xl hover:bg-slate-100"
                        onClick={handleSkip}
                      >
                        ⏭️
                      </button>
                      <button
                        className="ml-2 mr-2 w-16 h-12 text-xl bg-white border-2 mt-4 p-1.5 shadow-lg rounded-xl hover:bg-slate-100"
                        onClick={handleHintClick}
                      >
                        🆘
                      </button>
                      <button
                        className="w-16 h-12 text-xl bg-white border-2 mt-4 p-1.5 shadow-lg rounded-xl hover:bg-slate-100"
                        onClick={handleGuessSubmit}
                        id="guessButton"
                      >
                        ✅
                      </button>
                    </div>

                    {/* <button
                    className="mt-8 bg-red-300 px-6 py-1 shadow-lg rounded-xl hover:bg-red-500 hover:text-white"
                    onClick={handleEndGame}
                  >
                    End game
                  </button> */}

                    <div className="flex flex-col items-center  mt-8 sm:w-1/2 w-full">
                      <div>Points: {points}</div>
                      <div>Skips: {skips}</div>
                      <div>Wrong guesses: {wrongGuesses}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: showScorePokemon ? "block" : "none",
              }}
              className="bg-slate-100 max-w-3xl mx-auto flex mt-32  border-2 rounded-xl"
            >
              <div className="text-3xl sm:text-3xl text-center p-16 flex justify-center items-center mx-auto ">
                You guessed {points} / 151 correctly!
              </div>
              <Link to="/leaderboards/pokemon">
                <div className="text-md sm:text-md text-center p-4 flex justify-center items-center mx-auto ">
                  See where I place on the leaderboard!{" "}
                </div>
              </Link>
              <Link to="/">
                <div className="text-md sm:text-md text-center p-4 flex justify-center items-center mx-auto ">
                  Back to home
                </div>
              </Link>
            </div>
          </>
        )}
      </body>
    </>
  );
};

export default Quiz;
