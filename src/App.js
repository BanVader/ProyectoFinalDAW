import { BrowserRouter, Route, Routes } from "react-router-dom";
import Productos from './components/Productos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Productos></Productos>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
