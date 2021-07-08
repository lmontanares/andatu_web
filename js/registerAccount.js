    formReg = document.getElementById('form')

    warning = document.getElementById('warnings')

    formReg.addEventListener('submit', function (event) {
        event.preventDefault()

        let body = {};
        for (let i = 0; i < formReg.length; ++i) {
            body[formReg[i].id] = formReg[i].value
            console.log(formReg[i].id + ' -- ' + formReg[i].value)
        }


        let response_status
        fetch('https://grindman.pythonanywhere.com/auth/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(response => {
                response_status = response.status;
                return response.json();
            })
            .then(data => {
                    if (response_status === 201) {
                        console.log('Success:', data);
                        window.location.href = 'index.html';
                    }
                    else if(response_status === 400){
                        console.log('400', data);
                        warning.innerHTML = 'No se puedo crear la cuenta'
                    }
                }
            )
    });
