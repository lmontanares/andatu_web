const name = document.getElementById('nombre')
const phone = document.getElementById('telefono')
const content = document.getElementById('contenido')
const obs = document.getElementById('obs')
const weight = document.getElementById('peso')
const metro_init = document.getElementById('origenEstacion')
const metro_final = document.getElementById('destinoEstacion')
const form = document.getElementById('form')


form.addEventListener("submit", e => {
    e.preventDefault()

    if (validation()) {
        console.log('validacion ok')

        get_profile().then(data => newPackage(data.id))
            .then(data => newDelivery(data.id_user, data.id))
            .then(data => {
                console.log(data)
                if (data) {
                    console.log('validacion okk')
                    window.location.href = "map.html";
                }
            })
    }
})


function get_profile_2() {
    let id;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token "+ sessionStorage.getItem('Token'));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://grindman.pythonanywhere.com/auth/users/me/", requestOptions)
        .then(response => response.json())
        .then(result => id = result.id)
        .catch(error => console.log('error', error));
    return id
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
        return response.json()
    } catch (error) {
        console.log(error)
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

    return response.json()
}
