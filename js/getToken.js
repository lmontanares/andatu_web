let formLogin = document.getElementById('form-login');

formLogin.addEventListener('submit', function (event) {
    // console.log("Form has been submited");
    // console.log(event.target)

    let data_ = {
        'email': document.getElementById('email').value,
        'password': document.getElementById('password').value
    }

    event.preventDefault()

    let response_status
    fetch(' http://127.0.0.1:8000/auth/token/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_),
    })
        .then(response => {
            response_status = response.status;
            return response.json();
        })
        .then(data => {
            if (response_status === 200) {

                console.log('Success:', data.auth_token);
                sessionStorage.setItem('Token', data.auth_token);
                window.location.href = "dashboard.html";
            } else {
                console.log('revise sus credenciales')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
});