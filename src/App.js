import logo from './logo.svg';
import './App.css';
import { Header} from "./components/Header"
import { Footer} from "./components/Footer"
import { Routes, Route, Link} from "react-router-dom"

function App() {
  return (
    <>
    <Header />
     <main>
       <Routes>
          <Route path="/" element={<p>Estamos en el home</p>}  /> 
          <Route path="/register" element={<p>formulario registro</p>}  /> 
        
       </Routes>
    
     </main>
    <Footer />
    </>

  );
}

export default App;
