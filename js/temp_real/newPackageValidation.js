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

    let flag = true
    if (name.value.length < 3) {
        document.getElementById('nameHelp').innerHTML = 'Nombre Invalido'
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
        function includeJs(jsFilePath) {
            var js = document.createElement("script");

            js.type = "text/javascript";
            js.src = jsFilePath;

            document.body.appendChild(js);
        }

        includeJs("js/registerDelivery.js")
    } else {
        console.log('revisar formulario')
    }

})