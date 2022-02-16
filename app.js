const { time } = require('console')
const now = require('performance-now')
const request = require('request')

sendData()

function sendData() {
    const date = new Date()
    let fecha = date.toISOString()
    let fechaF = fecha.substring(0, 10) + " " + fecha.substring(11, 19)
    let randomV = random(200, 220)
    let randomA = random(39, 42)
    request.post(
        'http://localhost:8080/MonitoreoEnergiaElectricaSENEAM/public/api/energy/data/r0001',
        {
            json: {
                "planta_id": "1",
                "ampValue": randomA,
                "voltsValue": randomV,
                "time": fechaF
            }
        },
        (error, res, body) => {
            if (error) {
                console.log(error)
                return
            }
            console.log(fechaF + ': statusCode: ' + res.statusCode + " ampValue: " + randomA + " voltsValue: " + randomV)
            //console.log(body)
        }
    )
}

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
setInterval(sendData, 60000)
