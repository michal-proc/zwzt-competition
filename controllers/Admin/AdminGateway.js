const Gateway = require("../Gateway");

class AdminGateway extends Gateway {

  validateAdmin(params) {
    return this.makeQuery("SELECT * FROM users WHERE login = ?", [...params]);
  }

  async getSetting(name) {
    const result = await this.makeQuery("SELECT val FROM settings WHERE name = ?", [name]);
    return result[0].val;
  }  

  async getAllSettings() {
    let result = await this.makeQuery("SELECT name, val FROM settings");
    return result;
  }

  updateSetting(name, val) {
    this.makeQuery("UPDATE settings SET val = ? WHERE name = ?", [val, name]);
  }
}

module.exports = AdminGateway;
