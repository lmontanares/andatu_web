const formlogin = document.getElementById("form-login")
const parrafo = document.getElementById("warnings")
const pass = document.getElementById("password")

let token = sessionStorage.getItem('Token')
        if (token) {
            window.location.href = "dashboard.html";
        }
formlogin.addEventListener("submit", e => {
    e.preventDefault()
    if (validation()) {

        let body_user = {
            'email': document.getElementById('email').value,
            'password': document.getElementById('password').value
        }
        get_token(body_user)
    }
})
//metodo asyncrono para obtener token de ingreso de usuario
const get_token = async (body) => {
    try {
        const response = await fetch('https://grindman.pythonanywhere.com/auth/token/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        const data = await response.json()
        if (response.status === 200) {
            sessionStorage.setItem('Token', data.auth_token);
            window.location.href = "dashboard.html";
        } else {
            console.log('revise sus credenciales')
        }
    } catch (e) {
        console.error(e)
    }
}

function validation() {
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    parrafo.innerHTML = ""
    if (!regexEmail.test(email.value)) {
        warnings += `El email no es valido <br>`
        entrar = true
    }
    if (entrar) {
        parrafo.innerHTML = warnings
        return false
    } else {
        parrafo.innerHTML = "Enviado"
        return true
    }
}
