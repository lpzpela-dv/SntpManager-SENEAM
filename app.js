var mysql = require('mysql');
const notify = require('./notifications-module');

var con = mysql.createConnection({ host: 'localhost', user: 'root', password: '' });
var toids = [];
let losdatos = [];
var pet = 0;
con.connect(function (err) {
    if (err) throw err;
    function Consultar() {
        pet = 0;
        toids = ["1.3.6.1.3.2016.1.0.1", "1.3.6.1.3.2016.2.0.1", "1.3.6.1.3.2016.3.0.1", "1.3.6.1.3.2016.4.0.1", "1.3.6.1.3.2016.5.0.1", "1.3.6.1.3.2016.6.0.1"
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
        DoJob();
    }

    function DoJob() {
        var objetos = toids;
        var i = 0;
        var contador = 0;
        var ooid = ["1.3.6.1.2.1.1.2.0"];
        peticiones(ooid, 0);
        while (i < objetos.length) {
            let oids = [objetos[i]];
            peticiones(oids, i + 1);
            contador += 1;
            i++;
        }
    }
    const snmpserv = require("net-snmp");
    let snmp = require('./snmp-get');
    var session = snmpserv.createSession("192.168.7.68", "public");
    function peticiones(oids, pos) {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        var fuldate = year + "/" + month + "/" + date + " " + hours + ":" + minutes + ":" + seconds;
        for (let i = 0; i < oids.length; i++) {
            snmp.Get(session, [oids[i]], snmpserv).then((datos) => {
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
                    tmpquery = "(now(), " + tmpquery + ")"
                    tmpquery = "INSERT INTO monitoreo.energy_records (regtime, area_id,voltl1,ampl1,wattsl1,kwhl1,fpl1,hzl1,voltl2,ampl2,wattsl2,kwhl2,fpl2,hzl2,voltl3,ampl3,wattsl3,kwhl3,fpl3,hzl3,voltl4,ampl4,wattsl4,kwhl4,fpl4,hzl4,voltl5,ampl5,wattsl5,kwhl5,fpl5,hzl5,voltl6,ampl6,wattsl6,kwhl6,fpl6,hzl6,voltl7,ampl7,wattsl7,kwhl7,fpl7,hzl7,voltl8,ampl8,wattsl8,kwhl8,fpl8,hzl8,voltl9,ampl9,wattsl9,kwhl9,fpl9,hzl9, volDiesel, StCFE, StPlanta) values " + tmpquery;
                    con.query(tmpquery, function (err, result, fields) {
                        if (err) throw err;
                        console.log("Guardado." + result.insertId);
                        let alerts = notify.validate(losdatos);
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

    }
    setInterval(() => {
        Consultar();
        console.log("...Leyendo sensores...");
    }, 15000);
});