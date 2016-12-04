/**
 * A single row in a {@link Feed}.
 *
 * @param {ArticleView} articleView the view to use when rendering an article
 * @param {Article} article the article to use when rendering
 * @constructor
 */
function FeedArticleView(articleView, article) {
  View.call(this);

  this.articleView = articleView;
  this.article = article;

  this.listen({ 'click a': 'click' });
}

// Subclass View.
FeedArticleView.prototype = Object.create(View.prototype);
FeedArticleView.prototype.constructor = FeedArticleView;

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
FeedArticleView.prototype.click = function(event) {
  this.articleView.article = this.article;
  this.articleView.render().show();
  event.preventDefault();
};

/**
 * Renders the feed article into the class's element.
 *
 * @returns {FeedArticleView} the current view for chaining calls
 */
FeedArticleView.prototype.render = function() {
  this.$element.find('a').text(this.article.title);
  return this;
};

FeedArticleView.template =
  '<li class="feed__article-item ">' +
    '<a href="#" class="feed__article-link"></a>' +
  '</li>';
