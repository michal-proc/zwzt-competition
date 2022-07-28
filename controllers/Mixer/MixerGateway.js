const Gateway = require("../Gateway");

class MixerGateway extends Gateway {
    getMixerList() {
        return this.makeQuery("SELECT * FROM mixer ORDER BY name", []);
    }
}

module.exports = MixerGateway;
