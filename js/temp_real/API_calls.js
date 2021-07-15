async function get_id() {
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
}

async function createPackage(bodyPackage) {
    'use strict';
    const url = 'https://grindman.pythonanywhere.com/package/'
    const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Token " + sessionStorage.getItem('Token')
            }
        }, method = 'POST',
        body = JSON.stringify(bodyPackage)
    )
    return response.json()
}

async function createDelivery(bodyDelivery) {
    const url = 'https://grindman.pythonanywhere.com/delivery/'
    const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Token " + sessionStorage.getItem('Token')
            }
        }, method = 'POST',
        body = JSON.stringify(bodyPackage)
    )
    return response.json()
}