const { time } = require('console')
const now = require('performance-now')
const axios = require('axios')


async function sendData() {
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

    let res = await axios.post('http://localhost:8080/MonitoreoEnergiaElectricaSENEAM/public/api/energy/data/r0001', data);

    console.log("<"+res.data.time+"> INFO: " + " V: " +res.data.voltsValue+ " A: " +res.data.ampValue);
}

function random(min, max) {
    // console.log('random')
    return Math.floor((Math.random() * (max - min + 1)) + min);
}



setInterval(sendData, 60000)