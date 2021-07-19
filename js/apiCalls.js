const get_profile = async (id = 'me') => {
    try {
        const url = `https://grindman.pythonanywhere.com/auth/users/${id}/`

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //fix token
                Authorization: "Token 2a7eb497e87c5285cb86f93922c0cdebad75bf2e"
            },
            method: 'GET',
        });
        return await response.json()

        //TODO add if(responde.status)

    } catch (error) {
        console.log(error)
    }
}

const deliveryList = async (id = '') => {
    id = id !== 0 ? id : '';
    try {
        const url = `https://grindman.pythonanywhere.com/delivery/${id}/`
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Token " + sessionStorage.getItem('Token')
            },
            method: 'GET',
        });
        return await response.json()
        //TODO add if(responde.status)

    } catch (error) {
        console.log(error)
    }
}

const packageList = async (id = '') => {
    try {
        const url = `https://grindman.pythonanywhere.com/package/${id}/`
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Token " + sessionStorage.getItem('Token')
            },
            method: 'GET',
        });
        return await response.json()

        //TODO add if(responde.status)

    } catch (error) {
        console.log(error)
    }
}



