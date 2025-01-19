import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import IntermediatePage from './IntermediatePage';
import ThirdPage from './ThirdPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/intermediate-page" element={<IntermediatePage />} />
        <Route path="/third-page" element={<ThirdPage />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;