const fs = require('fs');

function saveData(data) {
    dateTime = new Date();
    let path = "Log/" + dateTime.toISOString().substring(0, 10) + "_log.log";

    fs.appendFile(path, data + "\r\n", (err) => {
        return err;
    });
}

module.exports = {
    saveData: saveData
}

