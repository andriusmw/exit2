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


