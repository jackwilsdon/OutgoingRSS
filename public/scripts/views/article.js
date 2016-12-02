class ArticleView extends View {
  constructor(article) {
    super();

    this.article = article;

    this.listen({
      'click': event => event.target === this.element ? this.hide() : null,
      'click .article__header': () => this.hide(),
      'click .article__button[data-action="previous"]': () => this.previous(),
      'click .article__button[data-action="next"]': () => this.next(),
    });
  }

  previous(render = true) {
    if (this.article.hasOwnProperty('previous')) {
      this.article = this.article.previous;

      if (render) {
        this.render();
      }
    }
  }

  next(render = true) {
    if (this.article.hasOwnProperty('next')) {
      this.article = this.article.next;

      if (render) {
        this.render();
      }
    }
  }

  render() {
    this.$element
      .find('.article__header :header')
      .text(`${this.article.title} - ${this.article.date}`);

    this.$element
      .find('.article__content')
      .html(this.article.description);

    this.$element
      .find('.article__button[data-action="previous"]')
      .toggleClass('article__button--hidden',
        !this.article.hasOwnProperty('previous'));

    this.$element
      .find('.article__button[data-action="next"]')
      .toggleClass('article__button--hidden',
        !this.article.hasOwnProperty('next'));

    this.$element
      .find('.article__button[data-action="view"]')
      .attr('href', this.article.link);

    return this;
  }

  hide(animated = true) {
    if (animated) {
      this.$element.fadeOut();
    } else {
      this.$element.hide();
    }
  }

  show(animated = true, focus = true) {
    if (animated) {
      this.$element.fadeIn();
    } else {
      this.$element.show();
    }

    if (focus) {
      this.$element.find('.article__button').first().focus();
    }
  }
}
