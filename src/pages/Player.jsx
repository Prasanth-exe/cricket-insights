import React, { useState } from "react";
import players from "../data/players";
import PlayerStatRadar from "../components/PlayerStatRadar";
import PlayerStatTable from "../components/PlayerStatTable";

function Player() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedPlayer(null);

    if (value.trim() === "") {
      setFiltered([]);
      return;
    }

    const suggestions = players.filter((player) =>
      player.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(suggestions);
  };

  const buttonClick = () => {
    const player = players.find(
      (p) => p.name.toLowerCase() === query.toLowerCase()
    );
    setSelectedPlayer(player || null);
    setFiltered([]);
  };

  const optionClick = (name) => {
    setQuery(name);
    setFiltered([]);
  };

  const handleKeyDown = (e) => {
    if (filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedItem((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedItem((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === "Enter" && selectedItem >= 0) {
      e.preventDefault();
      const selectedName = filtered[selectedItem].name;
      setQuery(selectedName);
      setFiltered([]);
      setSelectedItem(-1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h3 className="text-xl font-semibold mb-4">
        Want to know player stats? Search here!
      </h3>

      {/* Search Input + Button */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="border px-3 py-2 flex-1 rounded"
          placeholder="Search player name..."
        />
        <button
          onClick={buttonClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {filtered.length > 0 && (
        <ul className="border mt-1 rounded shadow bg-white">
          {filtered.map((player, index) => (
            <li
              key={player.id}
              onClick={() => optionClick(player.name)}
              className={`cursor-pointer px-2 py-1 ${
                index === selectedItem ? "bg-blue-200" : ""
              }`}
            >
              {player.name}
            </li>
          ))}
        </ul>
      )}

      {/* Radar + Table */}
      {selectedPlayer && (
        <div className="mt-6 flex flex-col md:flex-row md:gap-8 md:items-start justify-center">
          {/* Radar */}
          <div className="flex-1 flex justify-center">
            <PlayerStatRadar radar={selectedPlayer.radar} />
          </div>

          {/* Table */}
          <div className="flex-1 flex justify-center">
            <PlayerStatTable table={selectedPlayer} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Player;
