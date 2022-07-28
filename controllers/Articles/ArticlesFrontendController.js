const Controller = require("../Controller");
const ArticlesGateway = require("./ArticlesGateway");

class ArticlesFrontendController extends Controller {
  constructor() {
    super();
    this.gateway = new ArticlesGateway();
  }

  async getArticle(req, res) {
    const { link } = req.params;
    const model = await this.gateway.getArticleByLink(link);

    if (model.length && (model[0].published || this.hasAdminPermissions(req))) {
      let substanceArts = await this.gateway.getArticlesFromCategory('Substancje', 4);
      substanceArts = substanceArts.filter(article => article.id != model[0].id);
      this.sendTemplatedView(res, 'articles/article', { article: model[0], layout: 'layout', pageTitle: model[0].name, seoDescription: model[0].intro, ogImage: model[0].ogImg, ogDescription: model[0].intro, slug: model[0].siteLink, substanceArts: substanceArts });
    } else {
      this.riseClient404(res);
    }
  }

  async getArticlesWithLimit(limit) {
    const articles = await this.gateway.getArticlesWithLimit(limit);
    return articles;
  }

  async searchArticles(req,res){
    const {name} = req.body
    const articles = await this.gateway.searchArticles(name);
    this.sendTemplatedView(res, 'search-view', { searchPhrase: name, articles: articles })
  }

  async getArticlesCategory(req, res){
    const { category } = req.params;
    const articles = await this.gateway.getArticlesFromCategory(category);

    const categoryName = articles[0].category;

    if(!articles.length) {
      this.sendTemplatedView(res, 'admin/error-page404');
    } else {
      if (categoryName == 'Substancje') {
        let substancesGroups = await this.gateway.getSubstancesGroups();
        substancesGroups = substancesGroups.filter(item => item.substanceGroup != '');
        this.sendTemplatedView(res, 'category-substance-view', { img: '', name: categoryName, categoryRaw: category, articles: articles, pageTitle: categoryName, substancesGroups: substancesGroups})
      } else {
        this.sendTemplatedView(res, 'category-view', { img: '', name: categoryName, categoryRaw: category, articles: articles, pageTitle: categoryName })
      }
    }
  }
}

module.exports = new ArticlesFrontendController();
