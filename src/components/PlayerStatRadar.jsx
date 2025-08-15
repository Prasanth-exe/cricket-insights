import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";

const PlayerStatRadar = ({ radar, playerName }) => {
  const [fontSize, setFontSize] = useState(14);
  const [chartHeight, setChartHeight] = useState(600);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 500) {
        setFontSize(10);
        setChartHeight(300); // smaller height on very small screens
      } else if (width < 768) {
        setFontSize(12);
        setChartHeight(400); // medium height for tablets
      } else {
        setFontSize(14);
        setChartHeight(600); // full size for desktops
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!radar) return null;

  const data = Object.entries(radar).map(([key, value]) => ({
    subject: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase()),
    stat: value,
  }));

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name={playerName || "Player Stats"}
          dataKey="stat"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default PlayerStatRadar;
