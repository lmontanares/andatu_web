const tableList = document.getElementById('tableList')

async function get_profile(id = 'me') {
    try {
        const url = `https://grindman.pythonanywhere.com/auth/users/${id}/`

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


const assingDelivery = async (delivery_id) => {
    const user = await get_profile()

    let body_delivery = {
        'id_user_B': user.id
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
            body: JSON.stringify(body_delivery)
        });
        return await response.json()
        //TODO add if(responde.status)

    } catch (error) {
        console.log(error)
    }
}


let fill_table = async () => {
    const d_list = await deliveryList()
    const p_list = await packageList()
    const user = await get_profile()


    //TODO fix button


    d_list.forEach(delivery_data => {
        let code;
        let msg;
        p_list.forEach(package_data => {
            if (delivery_data.id_package_1 === package_data.id && delivery_data.id_user_A !== user.id) {
                if(!delivery_data.id_user_B){
                 msg = 'No'
                }else{
                msg = 'Si'
                }


                // console.log(get_profile(delivery_data.id_user_B))
                code = ` <tr>
                      <th scope="row">${delivery_data.id}</th>
                      <td>${package_data.weight} g.</td>
                      <td>${delivery_data.metro_init}</td>
                      <td>${delivery_data.metro_final}</td>
                      <td>${delivery_data.status}</td>
                      <td>${msg}</td>
                      <td><button onclick="assingDelivery(${delivery_data.id})" id="start_btn" type="button" class="btn btn-warning">Iniciar Envio</button></td>
                      <td><button id="" type="button" class="btn btn-warning">MAP placeholder</button></td>
                   </tr>`
            }
        })
        if (typeof code !== 'undefined') {
            tableList.innerHTML += code
        }
    })
}
//TODO add this to other pages
document.addEventListener("DOMContentLoaded", function () {
    fill_table()


});
