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


function Table(id, name_receiver, content, status) {
    this.id = id
    this.name_receiver = name_receiver
    this.content = content
    this.status = status
}



let fill_table = async (args) => {
    tableList.innerHTML = ""
    const p_list = await packageList()
    const d_list = await deliveryList()

    let singleRow = new Table()
    p_list.forEach(package_data => {
        singleRow.id = package_data.id
        singleRow.content = package_data.content
        d_list.forEach(delivery_data => {
            if (singleRow.id === delivery_data.id_package_1) {
                singleRow.name_receiver = delivery_data.name_receiver
                singleRow.status = delivery_data.status
            } else {
                return
            }

            //TODO fix button
            tableList.innerHTML += ` <tr>
                      <th scope="row">${singleRow.id}</th>
                      <td>${singleRow.name_receiver}</td>
                      <td>${singleRow.content}</td>
                      <td>${singleRow.status}</td>
                      <td><button onclick="on_off(${singleRow.id},'${singleRow.status}')" id="delbtn" type="button" class="btn btn-warning">Iniciar/Detener</button></td>
                   </tr>`
        })
    })
}


const on_off = async (id_package, status) => {
    let s;
    if (status !== 'activo') {
        s = 'activo'
    } else{
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
        console.log(await response.json())

        //TODO add if(responde.status)
    } catch (error) {
        console.log(error)
    }

fill_table()
}


// function on_off()
// {console.log("hello world")}

fill_table()