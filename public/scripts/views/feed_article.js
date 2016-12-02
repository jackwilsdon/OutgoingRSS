class FeedArticleView extends View {
  constructor(articleView, article) {
    super();

    this.articleView = articleView;
    this.article = article;

    this.listen({ 'click a': 'click' });
  }

  click(event) {
    this.articleView.article = this.article;
    this.articleView.render().show();
    event.preventDefault();
  }

  render() {
    this.$element.find('a').text(this.article.title);
    return this;
  }
}

FeedArticleView.template = `
  <li class="feed__article-item ">
    <a href="#" class="feed__article-link"></a>
  </li>
`;
