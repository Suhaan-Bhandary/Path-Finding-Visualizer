import "./App.css";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer.jsx";
import {Tutorial} from "./PathfindingVisualizer/Tutorial/Tutorial.jsx";


function App() {
  return (
    <div className="App">
      <PathfindingVisualizer></PathfindingVisualizer>
      <div className="PopUp">
        <Tutorial />
      </div>
    </div>
    
  );
}

export default App;
