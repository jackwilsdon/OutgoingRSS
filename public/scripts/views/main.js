/**
 * A collection of feeds and unique identifiers.
 *
 * @typedef {Object.<string, Feed>} FeedCollection
 */

/**
 * A group of dynamically retrieved feeds.
 */
class MainView extends View {

  /**
   * Constructs a new view with the specified endpoint.
   *
   * @param {string} endpoint the endpoint to use when requesting new data
   */
  constructor(endpoint) {
    super();

    this.endpoint = endpoint;
    this.articleView = new ArticleView();
    this.feeds = {};
  }

  /**
   * Removes feeds that no longer exist and adds new feeds from the data.
   *
   * @param {FeedCollection} data the feeds to use when updating the view
   * @returns {undefined}
   * @private
   */
  handleChangedFeeds(data) {
    Object.keys(this.feeds)
      .filter(id => !data.hasOwnProperty(id))
      .forEach(id => delete this.feeds[id]);

    Object.keys(data)
      .filter(id => !this.feeds.hasOwnProperty(id))
      .forEach(id => this.feeds[id] = new FeedView(id, this.articleView));
  }

  /**
   * Updates the provided feed view using the provided feed.
   *
   * @param {FeedView} feed the feed view to update
   * @param {Feed} data the feed to use when updating
   * @returns {undefined}
   * @private
   */
  updateFeed(feed, data) {
    feed.name = data.name;
    feed.articles = data.articles.map(article => Object.assign(article, {
      previous: null,
      next: null,
    }));

    feed.articles.reduce((previous, next) => {
      previous.next = next;
      next.previous = previous;
      return next;
    });

    feed.render();
  }

  /**
   * Updates all feeds in the provided collection.
   *
   * @param {FeedCollection} data the collection of feeds to be updated
   * @returns {undefined}
   * @private
   */
  updateFeeds(data) {
    Object.keys(data).forEach(id => this.updateFeed(this.feeds[id], data[id]));
  }

  /**
   * Error callback for {@link #update()}.
   *
   * @param {Object} response the response object
   * @param {string} status the status code for the error
   * @param {string} error the message for the error
   * @returns {undefined}
   * @throws {Error}
   * @private
   */
  updateError(response, status, error) {
    if (response instanceof Error) {
      error = response;
    }

    throw new Error(`Failed to update feeds from ${this.endpoint}: ${error}`);
  }

  /**
   * Updates the view using the endpoint provided in the constructor.
   *
   * @returns {undefined}
   */
  update() {
    return $.getJSON(this.endpoint)
      .promise()
      .then(data => {
        this.handleChangedFeeds(data);
        this.updateFeeds(data);
        this.render();
      })
      .catch((...args) => this.updateError(...args));
  }

  /**
   * Renders all feeds into the class's element.
   *
   * @returns {MainView} the current view for chaining calls
   */
  render() {
    Object.keys(this.feeds)
      .sort()
      .map(id => this.feeds[id].render())
      .forEach(feed => this.$element.append(feed.$element));
  }
}

MainView.template = $('<div>');
