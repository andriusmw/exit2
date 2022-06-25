import { createContext, useEffect } from "react";
import { useState } from "react";
import { getMyUserDataService } from "../services";

export const AuthContext = createContext();

export const AuthProviderComponent = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null); 
    const [emailAuth, setEmailAuth] = useState(null);

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token]);
    //Cada vez que cambia el token se guarda en localStorage


    //espacio para funcion del get user por token
    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await getMyUserDataService(emailAuth)
                //conseguir acceso a email
                //console.log("authcontext")
                //console.log(emailAuth)
                //console.log(data)
                setUser(data);
            } catch (error) {
               logout();
            }
        }

        if(token) {
            getUserData()
        }
    }, [token])



    const login = (token) => {
        setToken(token);
    }

    const logout = () => {
        setToken("");
        setUser(null);
        setEmailAuth(null);
    }


    return (
     <AuthContext.Provider value={{token,user, login, logout, setEmailAuth}} > 
          {children }
     </AuthContext.Provider>
          );
};