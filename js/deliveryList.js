const tableList = document.getElementById('tableList')

async function get_profile() {
    try {
        const url = 'https://grindman.pythonanywhere.com/auth/users/me/'
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

const deliveryList = async () => {
    try {
        const url = 'https://grindman.pythonanywhere.com/delivery/'
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
const packageList = async () => {
    try {
        const url = 'https://grindman.pythonanywhere.com/package/'
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


const assingDelivery = async () => {
    console.log(get_profile())
}



let fill_table = async () => {
    const d_list = await deliveryList()
    const p_list = await packageList()

    //TODO fix button

    d_list.forEach(delivery_data => {
        let code;
        p_list.forEach(package_data => {

            if (delivery_data.id_package_1 === package_data.id) {
                code = ` <tr>
                      <th scope="row">${delivery_data.id}</th>
                      <td>${package_data.weight} g.</td>
                      <td>${delivery_data.metro_init}</td>
                      <td>${delivery_data.metro_final}</td>
                      <td>${delivery_data.status}</td>
                      <td>asignado placeholder</td>
                      <td><button id="delbtn" type="button" class="btn btn-warning">Iniciar Envio</button></td>
                      <td><button id="delbtn" type="button" class="btn btn-warning">MAP placeholder</button></td>
                   </tr>`
            }


        })
        tableList.innerHTML += code
    })
}
//TODO add this to other pages
document.addEventListener("DOMContentLoaded", function () {
    fill_table()
    assingDelivery()

});
