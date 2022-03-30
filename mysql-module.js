var mysql = require('mysql');

var connection = '';

function openMysqlConn() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '2905008',
        database: 'monitoreo'
    });

    connection.connect();
}

function MysqlGet() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from areas_st', function (error, results, fields) {
            if (error)
                reject(error);
            resolve(results);
        });
        connection.end();
    });
}

function MysqlSet(tmpquery) {
    return new Promise((resolve, reject) => {
        connection.query(tmpquery, function (error, results, fields) {
            if (error)
                reject(error);
            resolve(results);
        });
        connection.end();
    });
}

module.exports = {
    openMysqlConn: openMysqlConn,
    MysqlGet: MysqlGet,
    MysqlSet: MysqlSet
}