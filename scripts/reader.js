$(document).ready(() => {
  ArticleView.$element = $('#article');
  FeedView.template = $('#feed-template').html();
  MainView.$element = $('#feed-container');

  const main = new MainView('/feeds.php');

  $(document).keydown(event => {
    if (event.key === 'Escape') {
      main.articleView.hide();
    }

    if (event.key === 'ArrowLeft') {
      main.articleView.previous();
    }

    if (event.key === 'ArrowRight') {
      main.articleView.next();
    }
  });

  main.update();
});
