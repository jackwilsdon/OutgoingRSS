/**
 * A collection of feeds and unique identifiers.
 *
 * @typedef {Object.<string, Feed>} FeedCollection
 */

/**
 * A group of dynamically retrieved feeds.
 *
 * @param {string} endpoint the endpoint to use when requesting new data
 * @constructor
 */
function MainView(endpoint) {
  View.call(this);

  this.endpoint = endpoint;
  this.articleView = new ArticleView();
  this.feeds = {};
}

/**
 * Removes feeds that no longer exist and adds new feeds from the data.
 *
 * @private
 * @param {FeedCollection} data the feeds to use when updating the view
 */
MainView.prototype.handleChangedFeeds = function(data) {
  var id;

  for (id in this.feeds) {
    if (!data.hasOwnProperty(id)) {
      delete this.feeds[id];
    }
  }

  for (id in data) {
    if  (!this.feeds.hasOwnProperty(id)) {
      this.feeds[id] = new FeedView(id, this.articleView);
    }
  }
};

/**
 * Updates the provided feed view using the provided feed.
 *
 * @private
 * @param {FeedView} feed the feed view to update
 * @param {Feed} data the feed to use when updating
 */
MainView.prototype.updateFeed = function(feed, data) {
  feed.name = data.name;
  feed.articles = data.articles;

  for (var index = 0; index < feed.articles.length; index++) {
    var article = feed.articles[index],
        hasPrevious = index > 0,
        hasNext = index < feed.articles.length - 1;

    article.previous = hasPrevious ? feed.articles[index - 1] : null;
    article.next = hasNext ? feed.articles[index + 1] : null;
  }
};

/**
 * Updates all feeds in the provided collection.
 *
 * @private
 * @param {FeedCollection} data the collection of feeds to be updated
 */
MainView.prototype.updateFeeds = function(data) {
  this.handleChangedFeeds(data);

  for (var id in data) {
    this.updateFeed(this.feeds[id], data[id]);
  }

  this.render();
};

/**
 * Error callback for {@link #update()}.
 *
 * @private
 * @param {Object} response the response object
 * @param {string} status the status code for the error
 * @param {string} error the message for the error
 * @throws {Error}
 */
MainView.prototype.updateError = function(response, status, error) {
  if (response instanceof Error) {
    error = response;
  }

  throw new Error('Failed to update feeds from ' + this.endpoint + ': ' +
                  error);
};

/**
 * Updates the view using the endpoint provided in the constructor.
 *
 */
MainView.prototype.update = function() {
  return $.getJSON(this.endpoint)
    .promise()
    .then(this.updateFeeds.bind(this))
    .catch(this.updateError.bind(this));
};

/**
 * Renders all feeds into the class's element.
 *
 * @returns {MainView} the current view for chaining calls
 */
MainView.prototype.render = function() {
  Object.keys(this.feeds).sort().forEach(function(id) {
    this.$element.append(this.feeds[id].render().element);
  }, this);

  return this;
};

MainView.template = $('<div>');
