import SignIn from './pages/Auth/SignIn';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './pages/Auth/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} exact />
        <Route path="/register" element={<Register />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
