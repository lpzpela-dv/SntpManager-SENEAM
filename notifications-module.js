const axios = require("axios");
const log = require('./logs');
var conn = require('./mysql-module');

//Variables para almacenar los ultimos valores leídos, y banderas para notificar solo una vez On/Off
var cfeVoltL1 = null;
var cfeVoltL2 = null;
var cfeVoltL3 = null;
var cfenotifOn = false;
var cfenotifOff = false;
var plantaVoltL1 = null;
var plantaVoltL2 = null;
var plantaVoltL3 = null;
var plantanotifOn = false;
var plantanotifOff = false;
var cargaVoltL1 = null;
var cargaVoltL2 = null;
var cargaVoltL3 = null;
var carganotifOn = false;
var carganotifOff = false;

function validate(data) {
    //Settear la primera vez
    let notify = new Array();
    if (cfeVoltL1 == null || cfeVoltL2 == null || cfeVoltL3 == null) {
        cfeVoltL1 = data[1];
        cfeVoltL2 = data[7];
        cfeVoltL3 = data[13];
    }
    if (plantaVoltL1 == null || plantaVoltL2 == null || plantaVoltL3 == null) {
        plantaVoltL1 = data[19];
        plantaVoltL2 = data[25];
        plantaVoltL3 = data[31];
    }
    if (cargaVoltL1 == null || cargaVoltL2 == null || cargaVoltL3 == null) {
        cargaVoltL1 = data[37];
        cargaVoltL2 = data[43];
        cargaVoltL3 = data[49];
    }

    // Validacion de CFE
    if (data[1] < 118 || data[7] < 118 || data[13] < 118) {
        //CFE sin Energía
        if ((cfeVoltL1 < 118 || cfeVoltL2 < 118 || cfeVoltL3 < 118) && !cfenotifOff) {
            //ingresa si no a sido notificado de apagado
            notify.push({ type: 1, value: "Energía Eléctrica de CFE Apagada" });
            log.saveData(dateTime, " Energía Eléctrica de CFE Apagada", "AlarmLog");
            cfenotifOff = true;
            cfenotifOn = false;
        } else {
            if (!cfenotifOff) {
                notify.push({ type: 1, value: "Energía Eléctrica de CFE Apagada" });
                log.saveData(dateTime, " Energía Eléctrica de CFE Apagada", "AlarmLog");
                cfenotifOff = true;
                cfenotifOn = false;
            }
        }
    } else {
        if ((cfeVoltL1 > 117 || cfeVoltL2 > 117 || cfeVoltL3 > 117) && !cfenotifOn) {
            //ingresa si no a sido notificado
            notify.push({ type: 1, value: "Energía Electrica de CFE Encendida" });
            log.saveData(dateTime, " Energía Eléctrica de CFE Encendida", "AlarmLog");
            cfenotifOn = true;
            cfenotifOff = false;
        } else {
            if (!cfenotifOn) {
                notify.push({ type: 1, value: "Energía Eléctrica de CFE Encendida" });
                log.saveData(dateTime, " Energía Eléctrica de CFE Encendida", "AlarmLog");
                cfenotifOn = true;
                cfenotifOff = false;
            }
        }
    }
    // Validacion de Planta
    if (data[19] < 118 || data[25] < 118 || data[31] < 118) {
        //Planta sin Energía
        if ((plantaVoltL1 < 118 || plantaVoltL2 < 118 || plantaVoltL3 < 118) && !plantanotifOff) {
            //ingresa si no a sido notificado de apagado
            notify.push({ type: 1, value: "Energía Eléctrica de Planta Apagada" });
            log.saveData(dateTime, " Energía Eléctrica de Planta Apagada", "AlarmLog");
            plantanotifOff = true;
            plantanotifOn = false;
        } else {
            if (!plantanotifOff) {
                notify.push({ type: 1, value: "Energía Eléctrica de Planta Apagada" });
                log.saveData(dateTime, " Energía Eléctrica de Planta Apagada", "AlarmLog");
                plantanotifOff = true;
                plantanotifOn = false;
            }
        }
    } else {
        if ((plantaVoltL1 > 117 || plantaVoltL2 > 117 || plantaVoltL3 > 117) && !plantanotifOn) {
            //ingresa si no a sido notificado
            notify.push({ type: 1, value: "Energía Electrica de Planta Encendida" });
            log.saveData(dateTime, " Energía Eléctrica de Planta Encendida", "AlarmLog");
            plantanotifOn = true;
            plantanotifOff = false;
        } else {
            if (!plantanotifOn) {
                notify.push({ type: 1, value: "Energía Eléctrica de Planta Encendida" });
                log.saveData(dateTime, " Energía Eléctrica de Planta Encendida", "AlarmLog");
                plantanotifOn = true;
                plantanotifOff = false;
            }
        }
    }
    // Validacion de Carga
    if (data[37] < 118 || data[43] < 118 || data[49] < 118) {
        //Planta sin Energía
        if ((cargaVoltL1 < 118 || cargaVoltL2 < 118 || cargaVoltL3 < 118) && !carganotifOff) {
            //ingresa si no a sido notificado de apagado
            notify.push({ type: 1, value: "Energía Eléctrica de Carga Apagada" });
            log.saveData(dateTime, " Energía Eléctrica de Carga Apagada", "AlarmLog");
            carganotifOff = true;
            carganotifOn = false;
        } else {
            if (!carganotifOff) {
                notify.push({ type: 1, value: "Energía Eléctrica de Carga Apagada" });
                log.saveData(dateTime, " Energía Eléctrica de Carga Apagada", "AlarmLog");
                carganotifOff = true;
                carganotifOn = false;
            }
        }
    } else {
        if ((cargaVoltL1 > 117 || cargaVoltL2 > 117 || cargaVoltL3 > 117) && !carganotifOn) {
            //ingresa si no a sido notificado
            notify.push({ type: 1, value: "Energía Electrica de Carga Encendida" });
            log.saveData(dateTime, " Energía Eléctrica de Carga Encendida", "AlarmLog");
            carganotifOn = true;
            carganotifOff = false;
        } else {
            if (!carganotifOn) {
                notify.push({ type: 1, value: "Energía Eléctrica de Planta Encendida" });
                log.saveData(dateTime, " Energía Eléctrica de Carga Encendida", "AlarmLog");
                carganotifOn = true;
                carganotifOff = false;
            }
        }
    }

    //almacenar los valores consultados
    cfeVoltL1 = data[1];
    cfeVoltL2 = data[7];
    cfeVoltL3 = data[13];
    plantaVoltL1 = data[19];
    plantaVoltL2 = data[25];
    plantaVoltL3 = data[31];
    cargaVoltL1 = data[37];
    cargaVoltL2 = data[43];
    cargaVoltL3 = data[49];
    return notify;
}

async function generate(alertas) {
    if (alertas.length > 0) {
        for (let i = 0; i < alertas.length; i++) {
            let alertID;
            let alertType = alertas[i].type;
            await register(alertas[i].value).then((result) => {
                console.log("Registro almacenado en Alerta ID: " + result.insertId);
                alertID = result.insertId;
            });
            await sendToAPI(alertID, alertType).then(resp => {
                console.log(resp);
            });
        }
    } else {
        console.log("sin alerta para agregar");
    }
}

function sendToAPI(id,alertType) {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost/MonitoreoEnergiaElectricaSENEAM/public/api/notifications/" + id + "/" + alertType)
            .then(response => {
                resolve(response.data);
            });
    });
}

function register(alerta) {
    let v1, v2, v3;
    if (alerta.includes('CFE')) {
        v1 = cfeVoltL1;
        v2 = cfeVoltL2;
        v3 = cfeVoltL3;
    } else {
        if (alerta.includes('Planta')) {
            v1 = plantaVoltL1;
            v2 = plantaVoltL2;
            v3 = plantaVoltL3;
        } else {
            v1 = cargaVoltL1;
            v2 = cargaVoltL2;
            v3 = cargaVoltL3;
        }
    }
    return new Promise((resolve, reject) => {
        conn.openMysqlConn();
        if (v1 < 0) {
            v1 = 0;

        }
        if (v2 < 0) {
            v2 = 0;

        }
        if (v3 < 0) {
            v3 = 0;

        }
        let resp = conn.MysqlSet('INSERT INTO alarmas (area_id,alarma,VoltL1,VoltL2,VoltL3,fechaAlarma) values(1,"' + alerta + '",' + v1 + "," + v2 + "," + v3 + ',now());').then((result) => {
            resolve(result);
        });
    });
}

module.exports = {
    'validate': validate,
    'generate': generate
}