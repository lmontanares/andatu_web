import 'js/temp_real/API_callseal/API_calls'

let id_user = get_id().then(data => id_user = data.id)




















//´++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// var id_user = get_id()
//
//
// async function get_id() {
//     await fetch('https://grindman.pythonanywhere.com/auth/users/me/', {
//         headers: {Authorization: "Token " + sessionStorage.getItem('Token')}
//     })
//         .then(response => response.json())
//         .then(data => id_user = data.id)
//
// }
//
//
// form.addEventListener('submit', function (event) {
//     event.preventDefault()
//
//     let body_package = {
//         'id_user': id_user,
//         'content': content.value,
//         'weight': weight.value,
//         'obs': obs.value
//     }
//
//     let response_status
//     fetch('https://grindman.pythonanywhere.com/package/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: "Token " + sessionStorage.getItem('Token'),
//         },
//         body: JSON.stringify(body_package),
//     })
//         .then(response => {
//             response_status = response.status;
//             return response.json();
//         })
//         .then(data => {
//                 if (response_status === 201) {
//                     console.log('Success:', data);
//                     createDelivery().then(r => console.log(r))
//
//                 } else if (response_status === 400) {
//                     console.log('400', data);
//
//                 }
//             }
//         )
// });

