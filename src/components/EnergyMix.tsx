import React, { useEffect, useState } from "react";
import { fetchEnergyMix, GenerationMix } from "../services/energyService";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const colorMap: Record<string, string> = {
  wind: "#00BFFF",
  solar: "#FFD700",
  gas: "#FF7F50",
  nuclear: "#C71585",
  biomass: "#228B22",
  hydro: "#6495ED",
  coal: "#4B4B4B",
  imports: "#8A2BE2",
  other: "#CCCCCC",
};

const emojiMap: Record<string, string> = {
  wind: "💨",
  solar: "☀️",
  gas: "🔥",
  nuclear: "⚛️",
  biomass: "🌿",
  hydro: "💧",
  coal: "🪨",
  imports: "🚢",
  other: "🧩",
};

const EnergyMix = () => {
  const [mix, setMix] = useState<GenerationMix[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnergyMix().then((data) => {
      setMix(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading energy mix...</p>;

  const sortedMix = [...mix].sort((a, b) => b.perc - a.perc);

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>UK Energy Mix</h2>

      {/* Chart */}
      <div style={{ width: "100%", height: 300 }}>
  <ResponsiveContainer>
    <PieChart>
      <Pie
        data={sortedMix.filter(item => item.perc > 0.5)} // ← Opción A
        dataKey="perc"
        nameKey="fuel"
        cx="50%"
        cy="50%"
        outerRadius={100}
        labelLine={false}      // ← Opción B
        label={false}          // ← Opción B
      >
        {sortedMix
          .filter(item => item.perc > 0.5)
          .map((entry) => (
            <Cell
              key={entry.fuel}
              fill={colorMap[entry.fuel] || "#8884d8"}
            />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {sortedMix.map((item) => (
          <div
            key={item.fuel}
            style={{
              background: colorMap[item.fuel] || "#f5f5f5",
              borderRadius: "8px",
              padding: "1rem",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            <div style={{ fontSize: "1.2rem" }}>
              {emojiMap[item.fuel] || "⚡"} {item.fuel}
            </div>
            <p style={{ fontSize: "1.3rem", margin: "0.5rem 0 0" }}>
              {item.perc.toFixed(1)}%
            </p>
            <div
              style={{
                background: "#ffffff33",
                height: "8px",
                borderRadius: "4px",
                overflow: "hidden",
                marginTop: "0.5rem",
              }}
            >
              <div
                style={{
                  width: `${item.perc}%`,
                  background: "#fff",
                  height: "100%",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnergyMix;
