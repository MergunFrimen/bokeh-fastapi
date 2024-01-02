import { useEffect, useMemo, useState } from "react";

const App = () => {
  const [pdbId, setPdbId] = useState("1tqn");
  const plotUrl = useMemo(() => {
    return `http://localhost:8000/plots/ramachandran/${pdbId}`;
  }, [pdbId]);

  const fetchPlot = async () => {
    const response = await fetch(plotUrl);
    const data = await response.json();
    document.getElementById("myplot").innerHTML = "";
    Bokeh.embed.embed_item(data, "myplot");
  };

  const [plots, setPlots] = useState<{ name: string; route: string }>([]);

  useEffect(() => {
    const fetchPlots = async () => {
      const response = await fetch("http://localhost:8000/plots");
      const data = await response.json();
      setPlots(data);
    };
    fetchPlots();
  }, []);

  return (
    <div>
      <h1>Ramachandran Plot Viewer</h1>
      <label>Enter PDB ID:</label>
      <input
        type="text"
        value={pdbId}
        onChange={(e) => setPdbId(e.target.value)}
      />
      <button onClick={fetchPlot}>Fetch and Plot</button>

      <div className="">
        <h2>Available plots</h2>
        {plots.map((plot) => (
          <div>{plot.name}</div>
        ))}
      </div>
      <div>
        <h2>Ramachandran Plot</h2>
        <div id="myplot"></div>
      </div>
    </div>
  );
};

export default App;
