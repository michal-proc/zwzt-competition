const Gateway = require("../controllers/Admin/AdminGateway");
const db = new Gateway();

async function workModeChecker(req, res, next) {
    const isTurnedOn = await db.getSetting('workMode');

    if (parseInt(isTurnedOn)) {
        res.render('admin/wip-page');
    } else {
        next();
    }
}

async function secureChecker(req, res, next) {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url);
}

module.exports = {
    workModeChecker: workModeChecker,
    secureChecker: secureChecker
}