$(document).ready(function() {
  ArticleView.$element = $('#article');
  FeedView.template = $('#feed-template').html();
  MainView.$element = $('#feed-container');

  var main = new MainView('/feeds.php');

  $(document).keydown(function(event)  {
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
