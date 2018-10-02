$(document).ready(function() {
  ArticleView.$element = $('#article');
  FeedView.template = $('#feed-template').html();
  MainView.$element = $('#feed-container');

  var main = new MainView('/feeds.php');

  $(document).keydown(function(event)  {
    if (event.key === 'Escape') {
      main.articleView.hide();
    }

    //keycode 37 is Left Arrow Key
    if (event.key === 'ArrowLeft' || event.keyCode === 37) {
      main.articleView.previous();
    }

    //keycode 39 is Left Arrow Key
    if (event.key === 'ArrowRight' || event.keyCode === 39) {
      main.articleView.next();
    }
  });

  main.update();
});
