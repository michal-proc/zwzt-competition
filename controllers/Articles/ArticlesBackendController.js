const fs = require('fs');
const Controller = require("../Controller");
const ArticleModel = require("./ArticleModel");
const ArticlesGateway = require("./ArticlesGateway");

class ArticlesBackendController extends Controller {
  constructor() {
    super();
    this.gateway = new ArticlesGateway();
  }

  async addArticle(req, res) {
    if (!req.body.id) {
      const { title } = req.body;
      const article = new ArticleModel();
      article.setId(null);
      article.setName(title);
      article.setSiteLink(this.createUrl(title));
      article.setAddedDate(parseInt(Date.now() / 1000));
      await this.gateway.addArticle(article);
      res.redirect("/admin");
    } else {
      const { id, name, siteLink, ogImg, intro, addedDate, img, category, content, author, substanceGroup, published, sources, promoted } = req.body;
      const model = await this.gateway.getArticleById(id);
      
      model.setName(name);
      model.setSiteLink(siteLink);
      model.setAddedDate(addedDate);
      model.setIntro(intro);
      model.setContent(content);
      model.setAuthor(author);
      model.setSubstanceGroup(substanceGroup);
      model.setSources(sources);
      model.setImg(img);
      model.setOgImg(ogImg);
      model.setCategory(category);
      model.setIsPublished(published);
      model.setIsPromoted(promoted);
      console.log(model);
      this.gateway.updateArticle(model);
      res.redirect("/admin");
    }
  }

  async getArticle(req, res) {
    const articleId = req.params.id;
    const model = await this.gateway.getArticleById(articleId);
    if (!model) {
      this.rise404(res);
    }
    let categories = await this.gateway.getArticleCategories();
    categories.forEach((categ, index) => {
      if (categ.name == model.category) {
        categories[index].checked = true;
      }
    })

    this.sendTemplatedView(res, "admin/edit-article", { layout: "admin-layout", pageTitle: model.name, article: model, login: req.session.login, allCategories: categories });
  }

  async uploadImage(req, res) {
    const file = req.files.file;
    const path = `${__basedir}/static/uploads/articles/${this.sanitizeFilename(file.name)}`;
    const clientFilePath = `/uploads/articles/${this.sanitizeFilename(file.name)}`;
    fs.readFile(path, (err, data) => {
      if (data) {
        res.send(JSON.stringify({ location: clientFilePath }))
      } else {
        file.mv(path, err => {
          if (err) {
            return res.status(500).send(err);
          } else {
            res.send(JSON.stringify({ location: clientFilePath }));
          }
        })
      }
    })
  }

  async deleteArticle(req, res) {
    const id = req.body.id;
    this.gateway.deleteArticle(id);
    res.end();
  }
}

module.exports = new ArticlesBackendController();
