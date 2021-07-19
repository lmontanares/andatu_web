const tablePackage = document.getElementById("package_list")
const tableDelivery = document.getElementById("delivery_list")
const map = document.getElementById("map_test")


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

const endDelivery = async (id = '') => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const delivery_id = urlParams.get('id')

    let body_end = {
        'status': 'finalizado'
    }

    try {
        const url = `https://grindman.pythonanywhere.com/delivery/${delivery_id}/`
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Token " + sessionStorage.getItem('Token')
            },
            method: 'PATCH',
            body: JSON.stringify(body_end)
        });

        alert('Delivery Finalizado')
        window.location.href = "dashboard.html";


        return await response.json()
        //TODO add if(responde.status)

    } catch (error) {
        console.log(error)
    }
}

let fill_tables = async () => {
    let code = '';

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const delivery_id = urlParams.get('id')

    const delivery_list = await deliveryList(delivery_id)
    const package_list = await packageList(delivery_list.id_package_1)
    const profile = await get_profile(delivery_list.id_user_A)
    const profile_b = await get_profile(delivery_list.id_user_B)


    code = `                <tr>
                                <td class="col-md-1">ID</td>
                                <td class="col-md-2">${delivery_list.id}</td>
                            </tr>          <tr>
                                <td class="col-md-1">Inicio</td>
                                <td class="col-md-2">${delivery_list.metro_init}</td>
                            </tr>          <tr>
                                <td class="col-md-1">Final</td>
                                <td class="col-md-2">${delivery_list.metro_final}</td>
                            </tr>          <tr>
                                <td class="col-md-1">Dueño</td>
                                <td class="col-md-2">${profile.first_name} ${profile.last_name}</td>
                            </tr>          <tr>
                                <td class="col-md-1">Destinatario: </td>
                                <td class="col-md-2">${delivery_list.name_receiver}</td>
                            </tr>          <tr>
                                <td class="col-md-1">Telefono Destinatario</td>
                                <td class="col-md-2">${delivery_list.id}</td>
                            </tr>          <tr>
                                <td class="col-md-1">Estado</td>
                                <td class="col-md-2">${delivery_list.status}</td>
                            </tr>
                            <tr>
                                <td class="col-md-1">Asignado a</td>
                                <td class="col-md-2">${profile_b.first_name} ${profile_b.last_name}</td>
                            </tr>
`
    tableDelivery.innerHTML = code
    code = `     <tr>
                                <td class="col-md-1">ID</td>
                                <td class="col-md-2">${package_list.id}</td>
                            </tr>
                                <td class="col-md-1">Contenido</td>
                                <td class="col-md-2">${package_list.content}</td>
                            </tr>
                                <td class="col-md-1">Peso</td>
                                <td class="col-md-2">${package_list.weight}</td>
                            </tr>
                                <td class="col-md-1">Observaciones</td>
                                <td class="col-md-2">${package_list.obs}</td>
                            </tr>
    `
    tablePackage.innerHTML = code


    map.innerHTML = `<img src="https://maps.googleapis.com/maps/api/staticmap?center=metro+${delivery_list.metro_init},chile&markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222|&zoom=13&size=600x300&maptype=roadmap&key=AIzaSyB-ycEZ4Uof2nK2Y0cOjn7kwE08D3ovVmw" />`
}


document.addEventListener("DOMContentLoaded", function () {

    fill_tables()
    get_profile


});
