<?php

require_once __DIR__ . '/feed.php';

final class DemoFeed extends Feed {
  private $name;
  private $articles = array();

  public function __construct($name) {
    $this->name = $name;
  }

  public function getName() {
    return $this->name;
  }

  public function addArticle($article) {
    array_push($this->articles, $article);
  }

  public function hasArticle($article) {
    return in_array($article, $this->articles);
  }

  public function getArticles() {
    return $this->articles;
  }

  public function removeArticle($article) {
    do {
      $key = array_search($article, $this->articles);

      if ($key != false) {
        unset($articles[$key]);
      }
    } while ($key != false);
  }
}
