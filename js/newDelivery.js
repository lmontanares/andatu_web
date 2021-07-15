const name = document.getElementById('nombre')
const phone = document.getElementById('telefono')
const content = document.getElementById('descripcion')
const obs = document.getElementById('obs')
const weight = document.getElementById('peso')
const metro_init = document.getElementById('origenEstacion')
const metro_final = document.getElementById('destinoEstacion')
const form = document.getElementById('form')



form.addEventListener("submit", e => {
    e.preventDefault()

    if (validation()) {
        reg_new_pending_work()

    }
})

const reg_new_pending_work = async () => {

    const user_profile = await get_profile()
    const new_package = await newPackage(user_profile.id)
    const new_delivery = await newDelivery(user_profile.id, new_package.id)

}
function validation() {
    let flag = true
    if (name.value.length < 3) {
        document.getElementById('nombreHelp').innerHTML = 'Nombre Invalido'
        flag = false
    }
    if (phone.value.length < 8) {
        document.getElementById('telefonoHelp').innerHTML = 'Telefono Invalido'
        flag = false
    }
    if (content.value.length < 3) {
        document.getElementById('contentHelp').innerHTML = 'Invalido'
        flag = false
    }
    if (weight.value < 0 && weight.value > 3000) {
        console.log(weight.value)
        document.getElementById('pesoHelp').innerHTML = 'Peso Invalido'
        flag = false
    }
    if (flag) {
        return true
    }
}
async function newPackage(id_user) {
    let body_package = {
        'id_user': id_user,
        'content': content.value,
        'weight': weight.value,
        'obs': obs.value
    }
    const url = 'https://grindman.pythonanywhere.com/package/'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Token " + sessionStorage.getItem('Token'),
        },
        body: JSON.stringify(body_package),
    });
    //TODO add responde.status if
    return await response.json()

}
async function newDelivery(id_user, id_package) {

    let body_delivery = {
        'id_user_A': id_user,
        'id_package_1': id_package,
        'phone_receiver': phone.value,
        'name_receiver': name.value,
        'metro_init': metro_init.value,
        'metro_final': metro_final.value,
    }
    const url = 'https://grindman.pythonanywhere.com/delivery/'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Token " + sessionStorage.getItem('Token'),
        },
        body: JSON.stringify(body_delivery),
    });

    if (response.status === 201) {
        alert("Paquete Ingresado!")
        window.location.href = "pedidos.html";
    }
    return await response.json()


}
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

