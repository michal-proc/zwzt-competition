const express = require("express");
const ArticlesFrontendController = require("../controllers/Articles/ArticlesFrontendController");
const ContactControler = require("../controllers/Contact/ContactControler");
const MixerFrontendController = require("../controllers/Mixer/MixerFrontendController");
const router = express.Router();
const Controller = require("../controllers/Controller");

router.get("/", async (req, res) => {
  const articles = await ArticlesFrontendController.gateway.getArticlesWithLimit(3);
  const controller = new Controller();
  controller.sendTemplatedView(res, "index", { articles: articles });
});

router.get("/wip", (req, res) => { res.render("admin/wip-page") })

router.get("/mixer/:substance?", MixerFrontendController.getMixerList.bind(MixerFrontendController));

router.get("/:link", ArticlesFrontendController.getArticle.bind(ArticlesFrontendController));

router.get("/category/:category", ArticlesFrontendController.getArticlesCategory.bind(ArticlesFrontendController));

router.post("/search", ArticlesFrontendController.searchArticles.bind(ArticlesFrontendController))

router.post("/contact", ContactControler.saveMessage.bind(ContactControler))

module.exports = router;
