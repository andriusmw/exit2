
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const Auth = () => {
    //recibimos el token del usuario con el context
    const { user, logout} = useContext(AuthContext);
  


    return user ? (<p>Wellcome  {user.name}
                    <button onClick={() => logout() } >Logout</button> 
    </p> ) : (<ul>
            <li className="liheader"> <Link to="/register">Register</Link> </li>
            <li className="liheader"> <Link to="/login">Login</Link> </li>
         
        </ul>
    );

};