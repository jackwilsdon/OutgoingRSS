class FeedView extends View {
  constructor(name, articleView, articles = []) {
    super();

    this.name = name;
    this.articleView = articleView;
    this.articles = articles;

    this.$content = this.$element.find('.feed__articles');
    this.$button = this.$element.find('.feed__button[data-action="toggle"]');

    this.listen({ 'click .feed__header': 'headerClick' });
  }

  headerClick() {
    const visible = this.$content.finish().is(':visible');

    if (visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  render() {
    this.$element.find('.feed__header :header').text(this.name);

    this.articles.forEach(article =>
      this.$content.append(
        new FeedArticleView(this.articleView, article).render().$element));

    return this;
  }

  hide(animated = true) {
    this.$button.html('&plus;');

    if (animated) {
      this.$content.slideUp();
    } else {
      this.$content.hide();
    }
  }

  show(animated = true) {
    this.$button.html('&minus;');

    if (animated) {
      this.$content.slideDown();
    } else {
      this.$content.show();
    }
  }
}
