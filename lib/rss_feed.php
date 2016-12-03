<?php

require_once __DIR__ . '/feed.php';

/**
 * Represents a <code>Feed</code> that extracts it's articles from RSS XML.
 */
abstract class RSSFeed extends Feed {

  /**
   * Returns the root XML element for this feed.
   *
   * @return SimpleXMLElement the root XML element for this feed
   */
  protected abstract function getXML();

  /**
   * Returns the name of the feed.
   *
   * @return string the name of the feed
   */
  public final function getName() {
    return (string) $this->getXML()->channel->title;
  }

  /**
   * Returns all articles in the feed.
   *
   * @return Article[] all articles in the feed
   */
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
