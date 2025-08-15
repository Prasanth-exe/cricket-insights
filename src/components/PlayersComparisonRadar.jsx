import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const DualPlayerRadar = ({ player1, player2 }) => {
  const [fontSize, setFontSize] = useState(14);
  const [chartHeight, setChartHeight] = useState(600);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 500) {
        setFontSize(10);
        setChartHeight(300);
      } else if (width < 768) {
        setFontSize(12);
        setChartHeight(400);
      } else {
        setFontSize(14);
        setChartHeight(600);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!player1 || !player2) return null;

  // Build radar data
  const data = Object.keys(player1.radar).map((key) => ({
    subject: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase()),
    [player1.name]: player1.radar[key],
    [player2.name]: player2.radar[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name={player1.name}
          dataKey={player1.name}
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name={player2.name}
          dataKey={player2.name}
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default DualPlayerRadar;
