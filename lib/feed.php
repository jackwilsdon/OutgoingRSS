<?php

/**
 * Represents a serializable set of articles with a name.
 */
abstract class Feed implements JsonSerializable {

  /**
   * Returns the name of the feed.
   *
   * @return string the name of the feed
   */
  public abstract function getName();

  /**
   * Returns all articles in the feed.
   *
   * @return Article[] all articles in the feed
   */
  public abstract function getArticles();

  /**
   * Returns the data that should be used when serializing the feed.
   *
   * @return object the data that should be used when serializing the feed
   */
  public final function jsonSerialize() {
    return (object) array(
      'name' => $this->getName(),
      'articles' => $this->getArticles()
    );
  }
}
