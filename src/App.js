import logo from './logo.svg';
import './App.css';
import { Header} from "./components/Header"
import { Footer} from "./components/Footer"
import { Routes, Route, Link} from "react-router-dom"
import {HomePage} from "./pages/HomePage"
import {EntryPage} from "./pages/EntryPage"
import { LoginPage} from "./pages/LoginPage"
import { RegisterPage} from "./pages/RegisterPage"


function App() {
  return (
    <>
    <Header />
     <main>
       <Routes>
          <Route path="/" element={<HomePage />}  /> 
          <Route path="/register" element={<RegisterPage/> }  /> 
          <Route path="/login" element={<LoginPage />  }  /> 
          <Route path="/entry/:id" element={<EntryPage /> }  /> 
        
       </Routes>
    
     </main>
    <Footer />
    </>

  );
}

export default App;
