import { useContext } from "react"
import { AuthContext} from "../context/AuthContext" 
import { NewEntry } from "../components/NewEntry";

export const HomePage =  () => {
    const {user} = useContext(AuthContext);



    return <section>
        {user ? <NewEntry/> : null}

        <h1>Últimos Entradas</h1>
        <p>Aquí irá la lista de problemas de accesibilidad
            /Entradas tweetList tweets=tweets
        </p>  
    </section>
}