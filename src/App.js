import logo from './logo.svg';
import './App.css';
import { Header} from "./components/Header"
import { Footer} from "./components/Footer"
import { Routes, Route, Link} from "react-router-dom"
import {HomePage} from "./pages/HomePage"


function App() {
  return (
    <>
    <Header />
     <main>
       <Routes>
          <Route path="/" element={<HomePage />}  /> 
          <Route path="/register" element={<p>formulario registro</p>}  /> 
        
       </Routes>
    
     </main>
    <Footer />
    </>

  );
}

export default App;
