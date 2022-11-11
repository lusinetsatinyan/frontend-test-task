import { Routes, Route } from "react-router-dom";
import Home from './components/home';
import History from './components/history';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="history" element={<History />} />
      </Routes>
    </div>
  );
}


export default App;
