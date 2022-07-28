const AdminGateway = require("./AdminGateway");
const Controller = require("../Controller");
const ArticlesGateway = require("../Articles/ArticlesGateway");

// external - libs
const bcrypt = require("bcrypt");

class AdminController extends Controller {
  constructor() {
    super();
    this.gateway = new AdminGateway();
    this.articlesGateway = new ArticlesGateway();
  }

  // GETS
  async panelGet(req, res) {
    const articles = await this.articlesGateway.getArticlesList();
    this.sendTemplatedView(res, "admin/admin-panel", { pageTitle: "Panel admina", layout: "admin-layout", login: req.session.login, articles: articles});
  }
  
  async settingsGet(req, res) {
    const settings = await this.gateway.getAllSettings();
    this.sendTemplatedView(res, "admin/admin-settings", {pageTitle: "Ustawienia", layout: "admin-layout", settings: settings})
  }

  loginGet(req, res) {
    const flash = this.getFlash(req);
    this.sendTemplatedView(res, "admin/login", { pageTitle: "Zaloguj się do panelu", layout: "admin-layout", flash: flash });
  }

  loginPost(req, res) {
    const { login, password } = req.body;
    this.gateway.validateAdmin([login]).then((rows) => {
      if (rows[0]) {
        bcrypt.compare(password, rows[0].password, function (err, result) {
          if (result) {
            req.session.authorized = true;
            req.session.login = login;
          }
          res.redirect("/admin");
        });
      } else {
        this.setFlash(req, 'Taki uzytkownik nie istnieje lub podałeś złe dane.');
        res.redirect("/admin");
      }
    });
  }

  updateSettings(req, res) {
    Object.entries(req.body).forEach(([name,val]) => {
      this.gateway.updateSetting(name, val);
    })
    res.redirect('/admin');
  }

  logout(req, res) {
    req.session.destroy();
    res.redirect('/admin');
  }
}

module.exports = new AdminController();
