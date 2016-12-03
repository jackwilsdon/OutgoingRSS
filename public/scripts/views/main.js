class MainView extends View {
  constructor(endpoint) {
    super();

    this.endpoint = endpoint;
    this.articleView = new ArticleView();
    this.feeds = {};
  }

  handleChangedFeeds(data) {
    Object.keys(this.feeds)
      .filter(id => !data.hasOwnProperty(id))
      .forEach(id => delete this.feeds[id]);

    Object.keys(data)
      .filter(id => !this.feeds.hasOwnProperty(id))
      .forEach(id => this.feeds[id] = new FeedView(id, this.articleView));
  }

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

  updateFeeds(data) {
    Object.keys(data).forEach(id => this.updateFeed(this.feeds[id], data[id]));
  }

  updateError(response, status, error) {
    if (response instanceof Error) {
      error = response;
    }

    throw new Error(`Failed to update feeds from ${this.endpoint}: ${error}`);
  }

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

  render() {
    Object.keys(this.feeds)
      .sort()
      .map(id => this.feeds[id].render())
      .forEach(feed => this.$element.append(feed.$element));
  }
}

MainView.template = $('<div>');
