const nombres = document.getElementById("first_name")
const apellidos = document.getElementById("last_name")
const email = document.getElementById("email")
const rut = document.getElementById("rut")
const telefono = document.getElementById("phone")
const pass = document.getElementById("password")
const parrafo = document.getElementById("warnings")




form.addEventListener("submit", e => {
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    let rutRegex = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/
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

    if (entrar) {
        parrafo.innerHTML = warnings
    } else {
        function includeJs(jsFilePath) {
            var js = document.createElement("script");

            js.type = "text/javascript";
            js.src = jsFilePath;

            document.body.appendChild(js);
        }

        includeJs("js/registerAccount.js");
    }
})