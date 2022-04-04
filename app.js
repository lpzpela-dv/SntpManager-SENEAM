const snmpserv = require("net-snmp"); //Librería Agente SNMP
const notify = require('./notifications-module'); // Modulo que genera notificaciones
const snmp = require('./snmp-get'); // Modulo SNMP
var conn = require('./mysql-module'); //Modulo BDD

var session = snmpserv.createSession("192.168.7.68", "public"); // Se inicia sesión al Manager SNMP (Arduino)

//Se crea arreglo con las constantes de OIDs
const toids = ["1.3.6.1.3.2016.1.0.1", "1.3.6.1.3.2016.2.0.1", "1.3.6.1.3.2016.3.0.1", "1.3.6.1.3.2016.4.0.1", "1.3.6.1.3.2016.5.0.1", "1.3.6.1.3.2016.6.0.1"
    , "1.3.6.1.3.2016.1.0.2", "1.3.6.1.3.2016.2.0.2", "1.3.6.1.3.2016.3.0.2", "1.3.6.1.3.2016.4.0.2", "1.3.6.1.3.2016.5.0.2", "1.3.6.1.3.2016.6.0.2"
    , "1.3.6.1.3.2016.1.0.3", "1.3.6.1.3.2016.2.0.3", "1.3.6.1.3.2016.3.0.3", "1.3.6.1.3.2016.4.0.3", "1.3.6.1.3.2016.5.0.3", "1.3.6.1.3.2016.6.0.3"
    , "1.3.6.1.3.2016.1.0.4", "1.3.6.1.3.2016.2.0.4", "1.3.6.1.3.2016.3.0.4", "1.3.6.1.3.2016.4.0.4", "1.3.6.1.3.2016.5.0.4", "1.3.6.1.3.2016.6.0.4"
    , "1.3.6.1.3.2016.1.0.5", "1.3.6.1.3.2016.2.0.5", "1.3.6.1.3.2016.3.0.5", "1.3.6.1.3.2016.4.0.5", "1.3.6.1.3.2016.5.0.5", "1.3.6.1.3.2016.6.0.5"
    , "1.3.6.1.3.2016.1.0.6", "1.3.6.1.3.2016.2.0.6", "1.3.6.1.3.2016.3.0.6", "1.3.6.1.3.2016.4.0.6", "1.3.6.1.3.2016.5.0.6", "1.3.6.1.3.2016.6.0.6"
    , "1.3.6.1.3.2016.1.0.7", "1.3.6.1.3.2016.2.0.7", "1.3.6.1.3.2016.3.0.7", "1.3.6.1.3.2016.4.0.7", "1.3.6.1.3.2016.5.0.7", "1.3.6.1.3.2016.6.0.7"
    , "1.3.6.1.3.2016.1.0.8", "1.3.6.1.3.2016.2.0.8", "1.3.6.1.3.2016.3.0.8", "1.3.6.1.3.2016.4.0.8", "1.3.6.1.3.2016.5.0.8", "1.3.6.1.3.2016.6.0.8"
    , "1.3.6.1.3.2016.1.0.9", "1.3.6.1.3.2016.2.0.9", "1.3.6.1.3.2016.3.0.9", "1.3.6.1.3.2016.4.0.9", "1.3.6.1.3.2016.5.0.9", "1.3.6.1.3.2016.6.0.9"
    , "1.3.6.1.3.2016.7.0.1"
    , "1.3.6.1.3.2016.8.0.1", "1.3.6.1.3.2016.8.0.2"
];
var losdatos = []; // Arreglo para almacenar respuestas de peticiones snmp
var pet = 0; // Contador de peticiones para formateo de Query



// Función que barre el arreglo de oids y obtiene los datos
function getDataSnmpManager() {
    console.log("...Leyendo sensores...");
    pet = 0; // Contador de periciones
    //Obtener el ID del area
    peticiones(["1.3.6.1.2.1.1.2.0"], 0);
    for (let i = 0; i < toids.length; i++) {
        peticiones([toids[i]], i + 1);
    }
}

//Funcion que realiza la petición al arduino por SNMP, recibe como parametro el oid y la pos par almacenar en array losdatos[]
function peticiones(oids, pos) {
    // Petición SNMP al OID recibido como parametro en funcion Peticiones
    snmp.Get(session, oids, snmpserv).then((datos) => {
        pet += 1;
        losdatos[pos] = datos;
        if (pet == 58) {
            var cc = 0;
            var tmpquery = "";
            while (cc < 58) {
                if (cc == 0) {
                    tmpquery = losdatos[cc];
                }
                else {
                    if (losdatos[cc] < 0)
                        tmpquery += ", " + 0;
                    else
                        tmpquery += ", " + losdatos[cc] / 1000;
                }
                cc += 1;
            }
            //Se concatenan los valores obtenidos al query para almacenar en bdd
            tmpquery = "(now(), " + tmpquery + ")";
            tmpquery = "INSERT INTO monitoreo.energy_records (regtime, area_id,voltl1,ampl1,wattsl1,kwhl1,fpl1,hzl1,voltl2,ampl2,wattsl2,kwhl2,fpl2,hzl2,voltl3,ampl3,wattsl3,kwhl3,fpl3,hzl3,voltl4,ampl4,wattsl4,kwhl4,fpl4,hzl4,voltl5,ampl5,wattsl5,kwhl5,fpl5,hzl5,voltl6,ampl6,wattsl6,kwhl6,fpl6,hzl6,voltl7,ampl7,wattsl7,kwhl7,fpl7,hzl7,voltl8,ampl8,wattsl8,kwhl8,fpl8,hzl8,voltl9,ampl9,wattsl9,kwhl9,fpl9,hzl9, volDiesel, StCFE, StPlanta) values " + tmpquery;

            conn.openMysqlConn();
            conn.MysqlSet(tmpquery).then(result => {
                console.log("Guardado." + result.insertId);
                //Validar lecturas para generar alarmas
                let alerts = notify.validate(losdatos);
                // Se mandan datos para generar las alarmas en caso de existir alguna
                notify.generate(alerts).then(res => {
                    if (res != null) {
                        console.log(res)
                    }
                });
                console.log(alerts);
            });

        }
    }).catch((datos) => {
        console.log("Error");
    });
}


setInterval(() => {
    getDataSnmpManager();
}, 15000);