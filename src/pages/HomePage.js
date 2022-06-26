import { useContext, useState } from "react"
import { AuthContext} from "../context/AuthContext" 
import { NewEntry } from "../components/NewEntry";

export const HomePage =  () => {
    const {user} = useContext(AuthContext);
  

    //En el conditional rendering si hay user, comprueba si user.role es igual a admin y entonces muestra el componente
    //de crear entrada. (panel admin) Sino es admin, no muestra el panel de crear entrada. Pero sigue saludando en el header
    //Tiene que estar así porque si pongo user.role en la primera condicion y no estamos logueados, salta error al tratar de leer
    //la propiedad role de null. Y se j*de la app.

    return <section>
       {user ? (user.role === "admin") ? <NewEntry/> : null : null}

        <h1>Últimos Entradas</h1>
        <p>Aquí irá la lista de problemas de accesibilidad
            /Entradas tweetList tweets=tweets
        </p>  
    </section>
}