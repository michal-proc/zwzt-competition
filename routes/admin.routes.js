const express = require("express");
const router = express.Router();
// Controller
const AdminController = require("../controllers/Admin/AdminController");
const ArticlesBackendController = require("../controllers/Articles/ArticlesBackendController");
const ContactController = require("../controllers/Contact/ContactControler");
const UploaderController = require('../controllers/Uploader/UploaderController');

// /admin
router.get("/", isAuthorized, AdminController.panelGet.bind(AdminController));

// /admin/settings
router.get("/settings", isAuthorized, AdminController.settingsGet.bind(AdminController));
router.post("/settings", isAuthorized, AdminController.updateSettings.bind(AdminController));

// /admin/article
router.post("/article", isAuthorized, ArticlesBackendController.addArticle.bind(ArticlesBackendController));
router.post("/article/delete", isAuthorized, ArticlesBackendController.deleteArticle.bind(ArticlesBackendController));
router.get("/article/:id", isAuthorized, ArticlesBackendController.getArticle.bind(ArticlesBackendController));
router.post("/article/upload_image", isAuthorized, ArticlesBackendController.uploadImage.bind(ArticlesBackendController));

// /admin/login
router.post("/login", AdminController.loginPost.bind(AdminController));
router.get("/logout", isAuthorized, AdminController.logout.bind(AdminController));

// /admin/contact
router.get("/contact", isAuthorized, ContactController.getMessages.bind(ContactController));
router.get("/contact/delete/:id", isAuthorized, ContactController.deleteMessage.bind(ContactController));

router.get("/uploader", isAuthorized, UploaderController.uploaderLayer.bind(UploaderController));
router.post("/uploader/changeFile", isAuthorized, UploaderController.changeFile.bind(UploaderController));
router.post("/uploader/uploadImage", isAuthorized, UploaderController.uploadImage.bind(UploaderController));

// AUTHORIZER
function isAuthorized(req, res, next) {
  if (req.session.authorized) {
    next();
  } else {
    AdminController.loginGet(req, res);
  }
}

module.exports = router;