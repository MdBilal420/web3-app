
import {
  Routes,
  Route,
} from "react-router-dom"
import { Stats } from './features/stats/Stats';
import Dashboard from './features/stats/Dashboard';
import Home from './Home';
function App() { 

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </div>
  );
}

export default App;
