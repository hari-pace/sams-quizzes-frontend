import React, { useEffect, useState } from "react";
import Globe from "../../assets/globe.png";
import World from "../../assets/world.png";
import { Link } from "react-router-dom";

const CountriesQuiz = ({ currentUser }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userGuess, setUserGuess] = useState("");
  const [points, setPoints] = useState(0);
  const [skips, setSkips] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [countriesWithBlur, setCountriesWithBlur] = useState([]);
  const [hasGuessedLastCountry, setHasGuessedLastCountry] = useState(false);
  const [showScoreCountries, setShowScoreCountries] = useState(false);

  const getCountries = async () => {
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,capital"
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching country data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []); // Only fetch country data once when the component mounts

  useEffect(() => {
    if (countries.length > 0) {
      // Shuffle and set initial state when data is available
      const shuffledCountries = [...countries].sort(() => Math.random() - 0.5);

      const slicedCountries = shuffledCountries.slice(0, 50);
      console.log(slicedCountries);
      setCountriesWithBlur(
        slicedCountries.map((country) => ({ ...country, blurred: true }))
      );
    }
  }, [countries]);

  useEffect(() => {
    // Check if the user has guessed the last Pokémon and execute the action
    if (hasGuessedLastCountry) {
      // Perform the action you want after the user has guessed the last Pokémon
      console.log("User guessed the last country!");
      // Optionally, you can render new information or trigger some other behavior
      addUser();
      setShowScoreCountries(true);
      // Reset the hasGuessedLastPokemon state for the next round or action
      setHasGuessedLastCountry(false);
    }
  }, [hasGuessedLastCountry]);

  const addUser = async () => {
    console.log("addUser triggered");
    const response = await fetch(
      "https://sams-quizzes.onrender.com/leaderboard/countries/countries",
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

  const currentCountry = countriesWithBlur[currentCountryIndex];

  const handleGuessSubmit = () => {
    // Check if the user's guess matches the current country's name
    if (currentCountry.name.common.toLowerCase() === userGuess.toLowerCase()) {
      // If correct, unblur the image, show success message, and add a point
      alert("Correct guess! You earned a point.");
      setPoints(points + 1);

      // Update the state to unblur the guessed Pokemon
      setCountriesWithBlur((prevCountries) =>
        prevCountries.map((country, index) =>
          index === currentCountryIndex
            ? { ...country, blurred: false }
            : country
        )
      );

      if (currentCountryIndex === 49) {
        setHasGuessedLastCountry(true);
      }

      // Move to the next country after a delay
      const timeout = setTimeout(() => {
        setCurrentCountryIndex((prevIndex) => prevIndex + 1);
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
    // Move to the next country

    setSkips(skips + 1);
    setCountriesWithBlur((prevCountries) =>
      prevCountries.map((country, index) =>
        index === currentCountryIndex ? { ...country, blurred: false } : country
      )
    );
    if (currentCountryIndex === 49) {
      console.log("skipped the last country");
      setHasGuessedLastCountry(true);
    }
    // Clear the input field after submission
    // const timeout = setTimeout(() => {
    setCurrentCountryIndex((prevIndex) => prevIndex + 1);
    setUserGuess("");
    // }, 3000);
  };

  const handleHintClick = () => {
    // Show the first letter of the country's name as a hint
    alert(
      `Hint: The first letter of the country's name is "${currentCountry.name.common.charAt(
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
          backgroundImage: `url(${World})`,
        }}
      >
        {loading ? (
          <img
            src={Globe}
            className="h-40 animate-spin mx-auto my-80"
            alt="loading-spinner"
          />
        ) : (
          <>
            <div
              style={{
                display: !showScoreCountries ? "block" : "none",
              }}
              className="mx-auto w-full max-w-6xl pt-4 sm:pt-12"
            >
              {countriesWithBlur?.map((country, index) => (
                <div
                  key={country.id}
                  style={{
                    display: index === currentCountryIndex ? "block" : "none",
                  }}
                  className="bg-slate-100 border-2 my-24 p-12 w-full flex flex-col items-center shadow-lg rounded-xl"
                >
                  <img
                    src={country.flags.svg}
                    alt="country-flag"
                    className={`mx-auto h-auto w-auto sm:max-h-64 shadow-xl ${
                      country.blurred ? "hue-rotate-90" : ""
                    }`}
                  />
                  <div className="flex flex-col items-center mt-8">
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
                display: showScoreCountries ? "block" : "none",
              }}
              className="bg-slate-100 max-w-3xl mx-auto flex mt-32  border-2 rounded-xl"
            >
              <div className="text-3xl sm:text-3xl text-center p-16 flex justify-center items-center mx-auto ">
                You guessed {points} / 50 correctly!
              </div>
              <Link to="/leaderboards/countries">
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

export default CountriesQuiz;
