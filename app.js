const { time } = require('console')
const now = require('performance-now')
const snmpserv = require("net-snmp");
// let logs = require('./logs');
let snmp = require('./snmp-get');

var session = snmpserv.createSession("192.168.1.155", "public");
var oids = ["1.3.6.1.3.2016.1.0.1"];
//var dateTime = new Date;

function peticiones(oids) {

    // snmp.Get(session, [oid], snmpserv).then((datos) => {
    //     console.log(datos);
    // });;

    for (let i = 0; i < oids.length; i++) {
        snmp.Get(session, [oids[i]], snmpserv).then((datos) => {
            console.log(datos);
        });;

    }

}

let oidsCFE = ["1.3.6.1.3.2016.1.0.1",
    "1.3.6.1.3.2016.2.0.1",
    "1.3.6.1.3.2016.3.0.1",
    "1.3.6.1.3.2016.4.0.1",
    "1.3.6.1.3.2016.5.0.1",
    "1.3.6.1.3.2016.6.0.1"
];
peticiones(oidsCFE);

// setInterval(() => {
//     // CFE data
//     let oidsCFE = ["1.3.6.1.3.2016.1.0.1",
//         "1.3.6.1.3.2016.2.0.1",
//         "1.3.6.1.3.2016.3.0.1",
//         "1.3.6.1.3.2016.4.0.1",
//         "1.3.6.1.3.2016.5.0.1",
//         "1.3.6.1.3.2016.6.0.1"
//     ];
//     peticiones(oidsCFE);
// }, 6000);
// setInterval(peticiones, 6000)