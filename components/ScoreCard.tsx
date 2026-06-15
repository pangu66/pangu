type Props = {
  home: string;
  away: string;
  score: string;
  live: boolean;
};

export default function ScoreCard({
  home,
  away,
  score,
  live
}: Props) {
  return (
    <div
      style={{
        background: "#111",
        padding: "20px",
        borderRadius: "20px",
        marginBottom: "15px"
      }}
    >
      <div>{live ? "LIVE" : "FINAL"}</div>
      <h2>{home}</h2>
      <h2>{away}</h2>
      <h1>{score}</h1>
    </div>
  );
}
