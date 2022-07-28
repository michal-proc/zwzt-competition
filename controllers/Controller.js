const AdminGateway = require('./Admin/AdminGateway');

class Controller {

  constructor() {
    this.adminGateway = new AdminGateway();
  }

  async sendTemplatedView(res, viewName, params) {

    const keywords = await this.adminGateway.getSetting('keywords');
    const seoDesc = await this.adminGateway.getSetting('mainPageSeoDesc');
    const seoTitle = await this.adminGateway.getSetting('seoTitle');

    res.render(viewName, {keywords: keywords, seoDescription: seoDesc, pageTitle: seoTitle, ...params});
  }

  rise404(res) {
    res.redirect("/admin");
  }

  riseClient404(res) {
    res.render("admin/error-page404");
  }

  createUrl(url) {
    url = url.toLowerCase();
    url = url.replace(/\s/g, '-');
    return url;
  }

  setFlash(req, flashText){
    req.session.flash = flashText;
  }

  getFlash(req){
    if(req.session){
      const { flash } = req.session;
      req.session.flash = null;
      return flash;
    }
  }

  sanitizeFilename(name) {
    name = name.toLowerCase();
    name = name.replace(/\s/g, '-');
    return name;
  }

  hasAdminPermissions(req) {
    return req.session.authorized;
  }
}

module.exports = Controller;
