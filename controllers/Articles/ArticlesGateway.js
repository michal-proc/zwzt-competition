const Gateway = require("../Gateway");
const ArticleModel = require("./ArticleModel");

class ArticlesGateway extends Gateway {
  addArticle(articleModel) {
    return this.makeQuery("INSERT INTO pages VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", articleModel.getDataAsArray());
  }

  getArticlesList() {
    return this.makeQuery("SELECT * FROM pages", []);
  }

  getArticleById(id) {
    return this.makeQuery("SELECT * FROM pages WHERE id = ?", [id]).then((rows) => {
      if(rows.length) {
        const { id, name, siteLink, intro, content, author, substanceGroup, sources, addedDate, img, ogImg, category, published, promoted } = rows[0];
        return new ArticleModel(id, name, siteLink, intro, content, author, substanceGroup, sources, addedDate, img, ogImg, category, published, promoted);
      } else {
        return null;
      }
    });
  }

  getArticleCategories() {
    return this.makeQuery("SELECT category FROM pages", []).then(rows => {
      const categories = [];

      rows.forEach(row => {
        categories.push({ name: row.category, checked: false} );
      })
      
      return categories;

    })
  }

  updateArticle(articleModel) {
    return this.makeQuery("UPDATE pages SET name = ?, siteLink = ?, intro = ?, content = ?, author = ?, substanceGroup = ?, sources = ?, addedDate = ?, img = ?, ogImg = ?, category = ?, published = ?, promoted = ?  WHERE id = ?", [
      articleModel.getName(),
      articleModel.getSiteLink(),
      articleModel.getIntro(),
      articleModel.getContent(),
      articleModel.getAuthor(),
      articleModel.getSubstanceGroup(),
      articleModel.getSources(),
      articleModel.getAddedDate(),
      articleModel.getImg(),
      articleModel.getOgImg(),
      articleModel.getCategory(),
      articleModel.isPublished(),
      articleModel.isPromoted(),
      articleModel.getId()
    ]);
  }

  getSubstancesGroups() {
    return this.makeQuery("SELECT DISTINCT substanceGroup FROM pages WHERE category = 'Substancje'");
  }

  getArticleByLink(link) {
    return this.makeQuery("SELECT * FROM pages WHERE siteLink = ?", [link]);
  }

  getArticlesWithLimit(limit) {
    return this.makeQuery("SELECT * FROM pages WHERE published = 1 AND promoted = 1 ORDER BY addedDate DESC LIMIT ? ", [limit]);
  }

  searchArticles(name){
    return this.makeQuery("SELECT * FROM pages WHERE (INSTR (name,?) > 0 OR INSTR(content,?) OR INSTR(intro,?)) AND published = 1 ORDER BY addedDate DESC", [name,name,name])
  }

  getArticlesFromCategory(category, limit = 30) {
    return this.makeQuery("SELECT * FROM pages WHERE category = ? AND published = 1 ORDER BY addedDate DESC LIMIT ?" , [category, limit]);
  }

  deleteArticle(id) {
    return this.makeQuery("DELETE FROM pages WHERE id = ?" , [id]);
  }
}

module.exports = ArticlesGateway;
