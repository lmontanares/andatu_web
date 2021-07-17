const tableList = document.getElementById('tableList')


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

const del_package = async (id) => {
    const url = `https://grindman.pythonanywhere.com/package/${id}`
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Token " + sessionStorage.getItem('Token'),
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE"
        }
    });
    //TODO add responde.status if
    console.log(response.status)
    return await response.json()
}

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


function Table(id, name_receiver, content, status) {
    this.id = id
    this.name_receiver = name_receiver
    this.content = content
    this.status = status
}


let fill_table = async () => {
    tableList.innerHTML = ""
    const p_list = await packageList()
    const d_list = await deliveryList()
    const user = await get_profile()

    let singleRow = new Table()

    p_list.forEach(package_data => {
        singleRow.id = package_data.id
        singleRow.content = package_data.content
        d_list.forEach(delivery_data => {
            if (singleRow.id === delivery_data.id_package_1 && user.id === delivery_data.id_user_A) {
                singleRow.name_receiver = delivery_data.name_receiver
                singleRow.status = delivery_data.status
            } else {
                //para terminar el loop
                return
            }
            //TODO fix button
            let btn_text = ""
            btn_text = singleRow.status !== 'activo' ? 'Iniciar' : 'Detener';

            tableList.innerHTML += ` <tr>
                      <th scope="row">${singleRow.id}</th>
                      <td>${singleRow.name_receiver}</td>
                      <td>${singleRow.content}</td>
                      <td>${singleRow.status}</td>
                      <td><button onclick="on_off(${singleRow.id},'${singleRow.status}')" id="delbtn" type="button" class="btn btn-warning">${btn_text}</button></td>
                   </tr>`
        })
    })
}


const on_off = async (id_package, status) => {
    let s;
    if (status !== 'activo') {
        s = 'activo'
    } else {
        s = 'detenido'
    }
    let body_patch = {
        'status': s
    }
    try {
        const url = `https://grindman.pythonanywhere.com/delivery/${id_package}/`
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Token " + sessionStorage.getItem('Token')
            },
            method: 'PATCH',
            body: JSON.stringify(body_patch)
        });
        await fill_table()
        return await response.json()

        //TODO add if(responde.status)
    } catch (error) {
        console.log(error)
    }


}

document.addEventListener("DOMContentLoaded", function () {
    fill_table()


});
