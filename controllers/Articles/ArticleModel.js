class ArticleModel {
  constructor(id = null, name, siteLink = "", intro = "", content = "", author = "", substanceGroup = "", sources = "", addedDate, img = "", ogImg = "", category = "", published = 0, promoted = 0) {
    this.id = id;
    this.name = name;
    this.siteLink = siteLink;
    this.intro = intro;
    this.content = content;
    this.author = author;
    this.substanceGroup = substanceGroup;
    this.sources = sources;
    this.addedDate = addedDate;
    this.img = img;
    this.ogImg = ogImg;
    this.category = category;
    this.published = published;
    this.promoted = promoted;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getSiteLink() {
    return this.siteLink;
  }

  setSiteLink(siteLink) {
    this.siteLink = siteLink;
  }

  getIntro(){
    return this.intro;
  }

  setIntro(intro){
    this.intro = intro;
  }

  getContent() {
    return this.content;
  }

  setContent(content) {
    this.content = content;
  }

  getAuthor() {
    return this.author;
  }

  setAuthor(author) {
    this.author = author;
  }

  getSubstanceGroup() {
    return this.substanceGroup;
  }

  setSubstanceGroup(substanceGroup) {
    this.substanceGroup = substanceGroup;
  }

  getSources() {
    return this.sources;
  }

  setSources(sources) {
    this.sources = sources;
  }

  getAddedDate() {
    return this.addedDate;
  }

  setAddedDate(addedDate) {
    this.addedDate = addedDate;
  }

  setImg(img) {
    this.img = img;
  }

  getImg() {
    return this.img;
  }

  setOgImg(img) {
    this.ogImg = img;
  }

  getOgImg() {
    return this.ogImg;
  }

  setCategory(category) {
    this.category = category;
  }

  getCategory() {
    return this.category;
  }

  setIsPublished(published){
    if(!published)
      published = 0

    if(published == "on")
      published = 1;

    this.published = published;
  }

  isPublished() {
    return this.published;
  }

  setIsPromoted(promoted) {
    if(!promoted)
      promoted = 0

    if(promoted == "on")
      promoted = 1;

    this.promoted = promoted;
  }

  isPromoted() {
    return this.promoted;
  }

  getDataAsArray() {
    return [this.id, this.name, this.siteLink, this.intro, this.content, this.author, this.substanceGroup, this.sources, this.addedDate, this.img, this.ogImg, this.category, this.published, this.promoted];
  }
}

module.exports = ArticleModel;
