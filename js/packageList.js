const tableList = document.getElementById('tableList').innerHTML = '    <tr>\n' +
    '                      <th scope="row">1</th>\n' +
    '                      <td>Mark</td>\n' +
    '                      <td>Otto</td>\n' +
    '                      <td>@mdo</td>\n' +
    '                    </tr>    <tr>\n' +
    '                      <th scope="row">1</th>\n' +
    '                      <td>Mark</td>\n' +
    '                      <td>Otto</td>\n' +
    '                      <td>@mdo</td>\n' +
    '                    </tr>'

const packageList = async () => {
    try {
        const url = 'https://grindman.pythonanywhere.com/package/'
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

const deliveryList = async () => {
    try {
        const url = 'https://grindman.pythonanywhere.com/delivery/'
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


let test = async () => {




    const p_list = await packageList()
    console.log(p_list)
    const d_list = await deliveryList()
    console.log(d_list)



};
test()