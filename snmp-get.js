let logs = require('./logs');
var data;
function Get(session, oids, snmp) {
    return new Promise((resolve, reject) => {
        dateTime = new Date;
        session.get(oids, function (error, varbinds) {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                // for (var i = 0; i < varbinds.length; i++) {
                if (snmp.isVarbindError(varbinds[0])) {
                    console.error(snmp.varbindError(varbinds[0]));
                } else {
                    var res = "<" + dateTime.toISOString().substring(0, 10) + " " + dateTime.toLocaleTimeString() + "> OID:" + varbinds[0].oid + " RESPONSE: " + varbinds[0].value;
                    //console.log(res);
                    resolve(varbinds[0].value);
                    var respo = logs.saveData(res);
                    // if (respo)
                    //     console.log(respo);
                }
                // }
            }
            //session.close();
        });
        session.trap(snmp.TrapType.LinkDown, function (error) {
            if (error) {
                console.error(error);
            }
        });
    });


}

module.exports = {
    Get: Get
}