const Controller = require("../Controller");
const MixerGateway = require("./MixerGateway");


class MixerFrontendController extends Controller {
    constructor() {
        super();
        this.gateway = new MixerGateway();
    }

    async getMixerList(req, res) {
        const list = await this.gateway.getMixerList();
        let { substance } = req.params || '';
        let urlSubstance = '';
        if (substance) {
            urlSubstance = ` - ${substance}`;
        }


        res.render("mixer", { mixer: list, contentType: "mixer", pageTitle: `Łączenie substancji${urlSubstance}`, substance: substance });
    }
}

module.exports = new MixerFrontendController();
