class Gateway {

  makeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
      global._connection.query(query, [...params], function (err, rows) {
        if (err) {
          reject("Something bad happened: " + err + "SQL: " + this.sql);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Gateway;
