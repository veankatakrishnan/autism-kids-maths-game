import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import RoundingGame from './pages/RoundingGame';
import PlaceValueGame from './pages/PlaceValueGame';
import RomanNumeralsGame from './pages/RomanNumeralsGame';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="rounding" element={<RoundingGame />} />
        <Route path="place-value" element={<PlaceValueGame />} />
        <Route path="roman-numerals" element={<RomanNumeralsGame />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}

export default App;
