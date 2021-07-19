const nombres = document.getElementById("first_name")
const apellidos = document.getElementById("last_name")
const email = document.getElementById("email")
const rut = document.getElementById("rut")
const telefono = document.getElementById("phone")
const pass = document.getElementById("password")
const re_pass = document.getElementById("re_password")
const parrafo = document.getElementById("warnings")
const form = document.getElementById('form')


form.addEventListener("submit", e => {
    e.preventDefault()

    if (validation()) {
        let new_user_data = {
            'first_name': nombres.value,
            'last_name': apellidos.value,
            'phone': telefono.value,
            'rut': rut.value,
            'email': email.value,
            'password': pass.value,
            're_password': re_pass.value,
        }
        reg_account(new_user_data)
    }
})

//methodo asyncrono para creacion de cuentas de usuario en API
const reg_account = async (body) => {
    try {
        const response = await fetch('https://grindman.pythonanywhere.com/auth/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        const data = await response.json()
        if (response.status === 201) {
            alert("Cuenta Creada")
            window.location.href = 'index.html';
        } else {
            //mensajes si existe duplicidad de email/rut/telefono
            if (data.phone) {
                parrafo.innerHTML += `${data.phone[0]} <br>`
            }
            if (data.email) {
                parrafo.innerHTML += `${data.email[0]} <br>`
            }
            if (data.rut) {
                parrafo.innerHTML += `${data.rut[0]} <br>`
            }
            if(data.password){
                parrafo.innerHTML += `${data.password[0]} <br>`
            }

        }
        console.log("Response Status " + response.status)
    } catch (e) {
        console.error(e)
    }
}

//Validación campos registro
function validation() {

    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
    let rutRegex = /^\d{1,2}\.?\d{3}\.?\d{3}[-][0-9kK]{1}$/
    let passwordRegex = /^(?=.*\d).{4,20}$/
    parrafo.innerHTML = ""
    if (nombres.value.length < 3) {
        warnings += `El nombre no es valido <br>`
        entrar = true
    }
    if (apellidos.value.length < 3) {
        warnings += `El nombre no es valido <br>`
        entrar = true
    }

    if (!regexEmail.test(email.value)) {
        warnings += `El email no es valido <br>`
        entrar = true
    }
    if (!passwordRegex.test(pass.value)) {
        warnings += `La contraseña debe tener minimo 4 letras y 1 numero <br>`
        entrar = true
    }
    if (!rutRegex.test(rut.value)) {
        warnings += `El rut no es valido (utilize formato xx.xxx.xxx-x) <br>`
        entrar = true
    }
    if (telefono.value.length < 8) {
        warnings += `El telefono no es valido <br>`
        entrar = true
    }
    if (pass.value !== re_pass.value) {
        warnings += `Contraseñas no coinciden <br>`
        entrar = true
    }

    if (entrar) {
        parrafo.innerHTML = warnings
        return false
    } else {
        return true

    }
}
