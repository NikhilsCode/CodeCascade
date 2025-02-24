
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Branches from "./pages/Branches"
import Environments from "./pages/Environments"
import Deployment from "./pages/Deployment"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/branch" element={<Branches />} />
          <Route path="/environments" element={<Environments />} />
          <Route path="/deployment" element={<Deployment />} />



        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
