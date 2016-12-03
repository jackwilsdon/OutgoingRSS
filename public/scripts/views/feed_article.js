/**
 * A single row in a {@link Feed}.
 */
class FeedArticleView extends View {

  /**
   * Constructs a new view with the provided article view and article.
   *
   * @param {ArticleView} articleView the view to use when rendering an article
   * @param {Article} article the article to use when rendering
   */
  constructor(articleView, article) {
    super();

    this.articleView = articleView;
    this.article = article;

    this.listen({ 'click a': 'click' });
  }

  /**
   * Callback for link click.
   *
   * <p>
   *   This updates the article for the article view and renders / shows it.
   * </p>
   *
   * @param {Event} event the click event for the link
   * @returns {undefined}
   * @private
   */
  click(event) {
    this.articleView.article = this.article;
    this.articleView.render().show();
    event.preventDefault();
  }

  /**
   * Renders the feed article into the class's element.
   *
   * @returns {FeedArticleView} the current view for chaining calls
   */
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
