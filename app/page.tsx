import ScoreCard from "../components/ScoreCard";
import Header from "../components/Header";

export default function Home() {
  const games = [
    {
      home: "Real Madrid",
      away: "Barcelona",
      score: "2 - 1",
      live: true
    },
    {
      home: "Lakers",
      away: "Celtics",
      score: "99 - 102",
      live: true
    },
    {
      home: "G2",
      away: "Vitality",
      score: "1 - 0",
      live: true
    },
    {
      home: "Verstappen",
      away: "Leclerc",
      score: "Lap 42",
      live: true
    }
  ];

  return (
    <main>
      <Header />
      <div style={{ padding: "20px" }}>
        {games.map((game, i) => (
          <ScoreCard key={i} {...game} />
        ))}
      </div>
    </main>
  );
}
