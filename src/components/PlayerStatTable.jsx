import React from "react";

function PlayerStatTable({ table }) {
  if (!table || !table.radar) return null;

  const radarKeys = Object.keys(table.radar);

  return (
    <div className="mt-6 w-full px-0 sm:px-0 md:pt-32">
      <div className="w-full max-w-md shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-600 text-white text-left uppercase tracking-wider">
              <th className="px-3 py-3 border-r border-blue-500">Breakdown</th>
              <th className="px-3 py-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {radarKeys.map((key) => (
              <tr
                key={key}
                className="bg-white text-black border-t border-gray-300"
              >
                <td className="px-4 py-2 border-r border-gray-300 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </td>
                <td className="px-4 py-2">{table.radar[key]} / 100</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlayerStatTable;
