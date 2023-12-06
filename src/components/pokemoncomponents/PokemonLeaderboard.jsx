import React, { useEffect, useState } from "react";
import Pokeballs from "../../assets/pokeballs.jpg";
import Pokeball from "../../assets/pokeball.png";

const PokemonLeaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPokemonLeaderboard = async () => {
    try {
      const res = await fetch(
        "https://sams-quizzes.onrender.com/leaderboard/pokemon/pokemon"
      );
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemonLeaderboard();
  }, []);

  console.log(users);

  return (
    <>
      <body
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url(${Pokeballs})`,
        }}
      >
        {loading ? (
          <img
            src={Pokeball}
            className="h-40 animate-spin mx-auto my-80"
            alt="loading-spinner"
          />
        ) : (
          <div className="mt-24 sm:pt-8 pb-8 sm:mt-40 mx-auto flex flex-col bg-slate-200">
            <div className="text-3xl mx-2 text-center sm:text-6xl h-20 flex justify-center items-center sm:mx-auto sm:mb-16">
              Pokemon Leaderboard
            </div>
            <table className="bg-slate-100 mx-4 sm:mx-48 rounded-xl ">
              <thead>
                <tr className=" ">
                  <th className="p-4 ">#</th>
                  <th className="p-4 ">Username</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Wrong guesses</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {users.map((user, index) => (
                  <tr className="p-2 border  " key={user._id}>
                    <th className="p-2 " scope="row">
                      {index + 1}
                    </th>
                    <td className="p-2">{user.username}</td>
                    <td className="p-2">{user.score}</td>
                    <td className="p-2">{user.wrongGuesses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </body>
    </>
  );
};

export default PokemonLeaderboard;
