/**
 * A collection of articles with a name.
 *
 * @typedef {Object} Feed
 * @property {string} name the name of the feed
 * @property {Article[]} articles the articles for the feed
 */

/**
 * A list of articles from a specific feed.
 */
class FeedView extends View {

  /**
   * Constructs a new view with the provided article view and articles.
   *
   * @param {string} name the name of the feed
   * @param {ArticleView} articleView the view to use when rendering an article
   * @param {Article[]} articles the articles to use when rendering
   */
  constructor(name, articleView, articles) {
    super();

    this.name = name;
    this.articleView = articleView;
    this.articles = articles;

    // Cache commonly used selectors / elements.
    this.$content = this.$element.find('.feed__articles');
    this.$button = this.$element.find('.feed__button[data-action="toggle"]');

    this.listen({ 'click .feed__header': 'headerClick' });
  }

  /**
   * Callback for header click.
   *
   * <p>
   *   This hides the content if it is visible and shows the content if it is
   *   not.
   * </p>
   *
   * @returns {undefined}
   * @private
   */
  headerClick() {
    const visible = this.$content.finish().is(':visible');

    if (visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Renders the feed into the class's element.
   *
   * @returns {FeedView} the current view for chaining calls
   */
  render() {
    // Set the header text to the name of the feed.
    this.$element.find('.feed__header :header').text(this.name);

    // Wipe the current content.
    this.$content.html('');

    // Render each article as a FeedArticleView and append it to the content.
    this.articles.forEach(article =>
      this.$content.append(
        new FeedArticleView(this.articleView, article).render().$element));

    return this;
  }

  /**
   * Hides the feed content (leaving only heading).
   *
   * @param {boolean} animated whether or not to animate the hiding of the
   *                           content
   * @returns {undefined}
   */
  hide(animated = true) {
    this.$button.html('&plus;');

    if (animated) {
      this.$content.slideUp();
    } else {
      this.$content.hide();
    }
  }

  /**
   * Shows the feed content.
   *
   * @param {boolean} animated whether or not to animate the showing of the
   *                           content
   * @returns {undefined}
   */
  show(animated = true) {
    this.$button.html('&minus;');

    if (animated) {
      this.$content.slideDown();
    } else {
      this.$content.show();
    }
  }
}
