import { Auth } from "./Auth";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Header = () => {
    

    return (
        <header>
            <h1> <Link to="/">EXIT2</Link> </h1>
            <nav>
                <Auth />
            </nav>
        </header>
    );
};
