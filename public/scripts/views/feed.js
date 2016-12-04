/**
 * A collection of articles with a name.
 *
 * @typedef {Object} Feed
 * @property {string} name the name of the feed
 * @property {Article[]} articles the articles for the feed
 */

/**
 * A list of articles from a specific feed.
 *
 * @param {string} name the name of the feed
 * @param {ArticleView} articleView the view to use when rendering an article
 * @param {Article[]} articles the articles to use when rendering
 * @constructor
 */
function FeedView(name, articleView, articles) {
  View.call(this);

  this.name = name;
  this.articleView = articleView;
  this.articles = articles;

  // Cache commonly used selectors / elements.
  this.$content = this.$element.find('.feed__articles');
  this.$button = this.$element.find('.feed__button[data-action="toggle"]');

  this.listen({ 'click .feed__header': 'headerClick' });
}

// Subclass View.
FeedView.prototype = Object.create(View.prototype);
FeedView.prototype.constructor = FeedView;

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
FeedView.prototype.headerClick = function() {
  var visible = this.$content.finish().is(':visible');

  if (visible) {
    this.hide();
  } else {
    this.show();
  }
};

/**
 * Renders the feed into the class's element.
 *
 * @returns {FeedView} the current view for chaining calls
 */
FeedView.prototype.render = function() {
  // Set the header text to the name of the feed.
  this.$element.find('.feed__header :header').text(this.name);

  // Wipe the current content.
  this.$content.html('');

  // Render each article as a FeedArticleView and append it to the content.
  this.articles.map(function(article) {
    return new FeedArticleView(this.articleView, article);
  }, this).forEach(function(article) {
    this.$content.append(article.render().$element);
  }, this);

  return this;
};

/**
 * Hides the feed content (leaving only heading).
 *
 * @param {boolean} [animated=true] whether or not to animate the hiding of the
 *                                  content
 * @returns {undefined}
 */
FeedView.prototype.hide = function(animated) {
  this.$button.html('&plus;');

  if (arguments.length === 0 || animated) {
    this.$content.slideUp();
  } else {
    this.$content.hide();
  }
};

/**
 * Shows the feed content.
 *
 * @param {boolean} [animated=true] whether or not to animate the showing of
 *                                  the content
 * @returns {undefined}
 */
FeedView.prototype.show = function(animated) {
  this.$button.html('&minus;');

  if (arguments.length === 0 || animated) {
    this.$content.slideDown();
  } else {
    this.$content.show();
  }
};
