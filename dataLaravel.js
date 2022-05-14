const axios = require('axios')

module.exports.sendData = function () {
    const date = new Date();
    let fecha = date.toISOString();
    let fechaF = fecha.substring(0, 10) + " " + fecha.substring(11, 19);
    let randomV = random(200, 220);
    let randomA = random(39, 42);
    let data = {
        "planta_id": "1",
        "ampValue": randomA,
        "voltsValue": randomV,
        "time": fechaF
    }

    let res = axios.post('http://localhost/MonitoreoEnergiaElectricaSENEAM/public/api/energy/data/r0001', data);

    return res.data
}

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}