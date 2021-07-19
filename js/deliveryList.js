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

const deliveryList = async (id = '') => {
    id = id !== 0 ? id : '';
    // if (id===0){
    //     id=''
    // }
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

//comienza o termina un delivery
const assingDelivery = async (delivery_id) => {
    const user = await get_profile()
    const delivery_data = await deliveryList(delivery_id)

    let body_delivery = {}
    if (delivery_data.id_user_B) {
        body_delivery = {'id_user_B': ''}
    } else {
        body_delivery = {'id_user_B': user.id}
    }
    // let body_delivery ={'id_user_B': user.id}
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
        await fill_table()
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

    let code = ""
    tableList.innerHTML = code
    //TODO fix button
    let counter = 0
    d_list.forEach(delivery_data => {
        let msg;
        code = ""
        p_list.forEach(package_data => {
            if (delivery_data.status === 'activo') {
                if (delivery_data.id_package_1 === package_data.id) {
                    if (package_data.id_user !== user.id) {
                        if (delivery_data.id_user_A !== user.id) {
                            if (!delivery_data.id_user_B || delivery_data.id_user_B === user.id) {
                                msg = !delivery_data.id_user_B ? 'No' : 'Si';
                                let btn_text = !delivery_data.id_user_B ? 'Iniciar Envio' : 'Detener Envio';
                                code += ` <tr>
                      <th scope="row">${delivery_data.id}</th>
                      <td>${package_data.content} </td>
                      <td>${package_data.weight}</td>
                      <td>${delivery_data.metro_init}</td>
                      <td>${delivery_data.metro_final}</td>
                      <td>${delivery_data.status}</td>
                      <td>${msg}</td>
                      <td><button onclick="assingDelivery(${delivery_data.id})" id="start_btn" type="button" class="btn btn-primary">${btn_text}</button></td>
                      <td><button onclick="go_toMap(${delivery_data.id})" id="" type="button" class="btn btn-warning">MAP placeholder</button></td>
                   </tr>`;
                                if (typeof code !== 'undefined') {
                                    counter++;
                                    // console.log('counter' + counter)
                                    tableList.innerHTML += code
                                } else {
                                    console.log("error here")
                                }
                            }
                        }
                    }
                }
            }
        })
        // if (typeof code !== 'undefined') {
        //     tableList.innerHTML += code
        // }
    })
}

function go_toMap(id_delivery) {
    window.location.href = `map.html?id=${id_delivery}`;
}

//TODO add this to other pages
document.addEventListener("DOMContentLoaded", function () {
    fill_table()
});
