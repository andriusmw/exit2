//poner aquí servicio getAllEntrysService


//poner aquí servicio getSingleEntryService


//--------------------register service-------------------------------------


export const registerUserService = async ({name,email,password}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name,email,password})
    });

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    } else {
        alert("Usuario registrado, comprueba tu correo para activar tu cuenta")
    }
};

//------------------- LOGIN SERVICE -----------------

export const loginUserService = async ({email,password}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password})
    });

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message)
    }

    return json.data;

};

//-------------------- GET USER DATA -------------------------

export const getMyUserDataService = async (email) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/${email}`);
    //Le paso el email por procs en la ruta. Lleva método GET por defecto.

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message)
        //Si hay error muestra el error
    } else {
        console.log("else")
        console.log(json)
        console.log(json.data)
        console.log("response")
        console.log(response)
        return json.data;
        //Sino hay error devuelve el json.data
    }

}

//--------------------------- CREATE ENTRY ----------------------

export const sendEntryService = async ({data, token}) => {
    const response = await fetch(`${process.end.REACT_APP_BACKEND}/entries`,{
        method: "POST",
        body: data,
        headers: {
            Authorization: token
        },
    });

    const json = await response.json();

    if(!response.ok) {
        console.log(json)
        throw new Error(json.message);
    }

    return json.data;
}