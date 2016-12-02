class FeedArticleView extends View {
  constructor(articleView, article) {
    super();

    this.articleView = articleView;
    this.article = article;

    this.listen({ 'click a': 'click' });
  }

  click() {
    this.articleView.article = this.article;
    this.articleView.render().show();
  }

  render() {
    this.$element.find('a').text(this.article.title);
    return this;
  }
}

FeedArticleView.template =
  '<li><a href="#" class="feed__article-link"></a></li>';
