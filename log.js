const fs = require('fs');

function saveData(dateTime, data, sname) {
    let path = "Log/" + sname + dateTime.toISOString().substring(0, 10) + ".log";

    fs.appendFile(path, data + "\r\n", (err) => {
        return err;
    });
}

module.exports = {
    saveData: saveData
}