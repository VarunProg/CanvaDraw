import ActionPanel from "./ActionPanel";
import CanvasPanel from "./CanvasPanel";

function App() {
  return (
    <div className="container" style={{ display: "flex" }}>
      <ActionPanel />
      <CanvasPanel />
    </div>
  );
}

export default App;
