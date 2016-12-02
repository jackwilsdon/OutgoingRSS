<?php

require_once __DIR__ . '/feed.php';

abstract class RSSFeed extends Feed {
  protected abstract function getXML();

  public final function getName() {
    return (string) $this->getXML()->channel->title;
  }

  public final function getArticles() {
    $articles = array();

    foreach ($this->getXML()->channel->item as $item) {
      array_push($articles, new Article(
        (string) $item->title,
        (string) $item->pubDate,
        (string) $item->description,
        (string) $item->link
      ));
    }

    return $articles;
  }
}
