<?php

/**
 * Storage for multiple feed objects.
 */
abstract class FeedHandler implements JsonSerializable {
  private $feeds = array();

  /**
   * Returns whether or not this handler contains a feed for the specified address.
   *
   * @param string $address the address to check
   * @return boolean whether or not this handler contains a feed for the
   *                 specified address
   */
  public final function hasFeed($address) {
    return array_key_exists(md5($address), $this->feeds);
  }

  /**
   * Creates a new feed for the specified address.
   *
   * @param string $address the address for the feed
   * @return Feed the feed for the specified address
   */
  protected abstract function createFeed($address);

  /**
   * Adds a new feed to the handler.
   *
   * @param string $address the address to add
   * @return boolean <code>true</code> if the feed was added,
   *                 <code>false</code> otherwise.
   */
  public final function addFeed($address) {
    if ($this->hasFeed($address)) {
      return false;
    } else {
      $key = md5($address);
      $this->feeds[$key] = $this->createFeed($address);

      return true;
    }
  }

  /**
   * Returns a list of all feeds in the handler.
   *
   * @return Feed[] a list of all feeds in the handler
   */
  public function getFeeds() {
    return $this->feeds;
  }

  /**
   * Removes the feed with the specified address from the handler.
   *
   * @param string $address the address of the feed to remove
   * @return boolean <code>true</code> if the feed was removed,
   *                 <code>false</code> otherwise.
   */
  public function removeFeed($address) {
    if ($this->hasFeed($address)) {
      $key = md5($address);
      unset($this->feeds[$key]);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Returns the data that should be used when serializing the feed handler.
   *
   * @return object the data that should be used when serializing the feed
   *                handler
   */
  public final function jsonSerialize() {
    return (object) $this->feeds;
  }
}
