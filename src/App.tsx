import { useMemo, useState } from "react";

const App = () => {
  const [pdbId, setPdbId] = useState("1tqn");
  const plotUrl = useMemo(() => {
    return `http://localhost:8000/calculate_ramachandran/${pdbId}`;
  }, [pdbId]);

  const fetchPlot = async () => {
    const response = await fetch(plotUrl);
    const data = await response.json();
    document.getElementById("myplot").innerHTML = "";
    Bokeh.embed.embed_item(data, "myplot");
  };

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

      <div>
        <h2>Ramachandran Plot</h2>
        <div id="myplot"></div>
      </div>
    </div>
  );
};

export default App;
