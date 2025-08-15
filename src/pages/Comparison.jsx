import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlayerA, setPlayerB } from "../redux/playerSlice";
import DualPlayerRadar from "../components/PlayersComparisonRadar";
import players from "../data/players";

import PlayerAImage from "../assets/PlayerA.jpg";
import PlayerBImage from "../assets/PlayerB.jpg";

function Comparison() {
  const dispatch = useDispatch();
  const { playerA, playerB } = useSelector((state) => state.player);

  // State for Player A search
  const [queryA, setQueryA] = useState("");
  const [filteredA, setFilteredA] = useState([]);
  const [selectedItemA, setSelectedItemA] = useState(-1);

  // State for Player B search
  const [queryB, setQueryB] = useState("");
  const [filteredB, setFilteredB] = useState([]);
  const [selectedItemB, setSelectedItemB] = useState(-1);

  // Handle input change for Player A
  const handleChangeA = (e) => {
    const value = e.target.value;
    setQueryA(value);

    if (!value.trim()) {
      setFilteredA([]);
      dispatch(setPlayerA(null));
      return;
    }

    const suggestions = players.filter(
      (p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) &&
        p.id !== playerB?.id
    );
    setFilteredA(suggestions);
  };

  // Handle input change for Player B (same role as Player A)
  const handleChangeB = (e) => {
    const value = e.target.value;
    setQueryB(value);

    if (!value.trim()) {
      setFilteredB([]);
      dispatch(setPlayerB(null));
      return;
    }

    const suggestions = players.filter(
      (p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) &&
        p.id !== playerA?.id &&
        p.role === playerA?.role
    );
    setFilteredB(suggestions);
  };

  // Handle arrow keys and enter for Player A
  const handleKeyDownA = (e) => {
    if (filteredA.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedItemA((prev) => (prev < filteredA.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedItemA((prev) => (prev > 0 ? prev - 1 : filteredA.length - 1));
    } else if (e.key === "Enter" && selectedItemA >= 0) {
      e.preventDefault();
      const player = filteredA[selectedItemA];
      setQueryA(player.name);
      dispatch(setPlayerA(player));
      setFilteredA([]);
      setSelectedItemA(-1);
    }
  };

  // Handle arrow keys and enter for Player B
  const handleKeyDownB = (e) => {
    if (filteredB.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedItemB((prev) => (prev < filteredB.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedItemB((prev) => (prev > 0 ? prev - 1 : filteredB.length - 1));
    } else if (e.key === "Enter" && selectedItemB >= 0) {
      e.preventDefault();
      const player = filteredB[selectedItemB];
      setQueryB(player.name);
      dispatch(setPlayerB(player));
      setFilteredB([]);
      setSelectedItemB(-1);
    }
  };

  const optionClickA = (player) => {
    setQueryA(player.name);
    dispatch(setPlayerA(player));
    setFilteredA([]);
  };

  const optionClickB = (player) => {
    setQueryB(player.name);
    dispatch(setPlayerB(player));
    setFilteredB([]);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Player Comparison</h1>

      <p className="text-center text-sm text-gray-500 mb-6">
        ⚠️ Note: The stats shown here are hardcoded for demonstration purposes
        and may not reflect the actual player data.
      </p>

      {/* Search Bars */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        {/* Player A */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={queryA}
            onChange={handleChangeA}
            onKeyDown={handleKeyDownA}
            placeholder="Search Player A..."
            className="border rounded-lg px-4 py-2 w-full"
          />
          {filteredA.length > 0 && (
            <ul className="absolute w-full bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto z-10">
              {filteredA.map((p, index) => (
                <li
                  key={p.id}
                  onClick={() => optionClickA(p)}
                  className={`cursor-pointer px-2 py-1 ${
                    index === selectedItemA ? "bg-blue-200" : ""
                  }`}
                >
                  {p.name} ({p.role})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Player B */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={queryB}
            onChange={handleChangeB}
            onKeyDown={handleKeyDownB}
            placeholder={
              playerA
                ? `Search Player B (${playerA.role})`
                : "Select Player A first"
            }
            className="border rounded-lg px-4 py-2 w-full"
            disabled={!playerA} // disable until Player A is selected
          />
          {filteredB.length > 0 && (
            <ul className="absolute w-full bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto z-10">
              {filteredB.map((p, index) => (
                <li
                  key={p.id}
                  onClick={() => optionClickB(p)}
                  className={`cursor-pointer px-2 py-1 ${
                    index === selectedItemB ? "bg-blue-200" : ""
                  }`}
                >
                  {p.name} ({p.role})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Player Images */}
      <div className="flex flex-col md:flex-row justify-center gap-12 items-center mb-8">
        {playerA && (
          <div className="flex flex-col items-center">
            <img
              src={PlayerAImage}
              alt={playerA.name}
              className="w-32 h-32 object-cover rounded-full shadow-md"
            />
            <p className="mt-2 font-semibold">{playerA.name}</p>
          </div>
        )}
        {playerB && (
          <div className="flex flex-col items-center">
            <img
              src={PlayerBImage}
              alt={playerB.name}
              className="w-32 h-32 object-cover rounded-full shadow-md"
            />
            <p className="mt-2 font-semibold">{playerB.name}</p>
          </div>
        )}
      </div>

      {/* Dual Radar */}
      <div className="h-[400px] md:h-[500px]">
        {playerA && playerB ? (
          <DualPlayerRadar player1={playerA} player2={playerB} />
        ) : (
          <p className="text-center text-gray-500">
            Select two players with the same role to compare.
          </p>
        )}
      </div>
    </div>
  );
}

export default Comparison;
