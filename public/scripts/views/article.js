/**
 * A single article.
 *
 * @typedef {Object} Article
 * @property {string} title the title of the article
 * @property {string} date the date the article was published
 * @property {string} description the description of the article
 * @property {string} link the link to the article
 * @property {?Article} previous the previous article
 * @property {?Article} next the next article
 */

/**
 * A modal view of a single article.
 *
 * @param {Article} article the article to use when rendering
 * @constructor
 */
function ArticleView(article) {
  View.call(this);

  this.article = article;

  this.listen({
    'click': function(event) {
      if (event.target === this.element) {
        this.hide();
        event.preventDefault();
      }
    },
    'click .article__header': 'hide',
    'click .article__button[data-action="previous"]': 'clickPrevious',
    'click .article__button[data-action="next"]': 'clickNext',
  });
}

// Subclass View.
ArticleView.prototype = Object.create(View.prototype);
ArticleView.prototype.constructor = ArticleView;

/**
 * Callback for previous button.
 *
 * <p>
 *   This changes the article to the previous article and re-renders the
 *   view.
 * </p>
 *
 * @param {Event} event the click event for the previous button
 * @returns {undefined}
 * @private
 */
ArticleView.prototype.clickPrevious = function(event) {
  this.previous();
  event.preventDefault();
};

/**
 * Callback for next button.
 *
 * <p>
 *   This changes the article to the previous article and re-renders the
 *   view.
 * </p>
 *
 * @param {Event} event the click event for the next button
 * @returns {undefined}
 * @private
 */
ArticleView.prototype.clickNext = function(event) {
  this.next();
  event.preventDefault();
};

/**
 * Swaps the current article out for the previous article.
 *
 * <p>
 *   If there is no previous article then nothing is changed.
 * </p>
 *
 * @param {boolean} [render=true] whether or not to call
 *                         {@link ArticleView#render} on the new article after
 *                         the article has changed
 * @returns {undefined}
 */
ArticleView.prototype.previous = function(render) {
  if (this.article.previous !== null) {
    this.article = this.article.previous;

    if (arguments.length === 0 || render) {
      this.render();
    }
  }
};

/**
 * Swaps the current article out for the bext article.
 *
 * <p>
 *   If there is no next article then nothing is changed.
 * </p>
 *
 * @param {boolean} [render=true] whether or not to call
 *                         {@link ArticleView#render} on the new article after
 *                         the article has changed
 * @returns {undefined}
 */
ArticleView.prototype.next = function(render) {
  if (this.article.next !== null) {
    this.article = this.article.next;

    if (arguments.length === 0 || render) {
      this.render();
    }
  }
};

/**
 * Renders the article into the class's element.
 *
 * @returns {ArticleView} the current view for chaining calls
 */
ArticleView.prototype.render = function() {
  // Set the text of all h[1-6] elements to the article's title and date.
  this.$element
    .find('.article__header :header')
    .text(this.article.title + ' - ' + this.article.date);

  // Set the body of the modal to the article's description.
  this.$element
    .find('.article__content')
    .html(this.article.description);

  // Hide or show the previous button depending on whether or not the article
  // has a previous element.
  this.$element
    .find('.article__button[data-action="previous"]')
    .toggleClass('article__button--hidden', this.article.previous === null);

  // Hide or show the next button depending on whether or not the article has
  // a next element.
  this.$element
    .find('.article__button[data-action="next"]')
    .toggleClass('article__button--hidden', this.article.next === null);

  // Set the link for the view button.
  this.$element
    .find('.article__button[data-action="view"]')
    .attr('href', this.article.link);

  return this;
};

/**
 * Hides the article modal.
 *
 * @param {boolean} [animated=true] whether or not to animate the hiding of the
 *                                  modal
 * @returns {undefined}
 */
ArticleView.prototype.hide = function(animated) {
  if (arguments.length === 0 || animated) {
    this.$element.fadeOut();
  } else {
    this.$element.hide();
  }
};

/**
 * Shows the article modal.
 *
 * @param {boolean} [animated=true] whether or not to animate the showing of
 *                                  the element
 * @param {boolean} [focus=true] whether or not to focus the element once it
 *                               has been made visible
 * @returns {undefined}
 */
ArticleView.prototype.show = function(animated, focus) {
  if (arguments.length === 0 || animated) {
    this.$element.fadeIn();
  } else {
    this.$element.show();
  }

  if (arguments.length <= 1 || focus) {
    // Focus the first button in the article (usually the close button).
    this.$element.find('.article__button').first().focus();
  }
};
