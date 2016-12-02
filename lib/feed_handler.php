<?php

abstract class FeedHandler implements JsonSerializable {
  private $feeds = array();

  public final function hasFeed($address) {
    return array_key_exists(md5($address), $this->feeds);
  }

  protected abstract function createFeed($address);

  public final function addFeed($address) {
    if ($this->hasFeed($address)) {
      return false;
    } else {
      $key = md5($address);
      $this->feeds[$key] = $this->createFeed($address);

      return true;
    }
  }

  public function getFeeds() {
    return $this->feeds;
  }

  public function removeFeed($address) {
    if ($this->hasFeed($address)) {
      $key = md5($address);
      unset($this->feeds[$key]);
      return true;
    } else {
      return false;
    }
  }

  public final function jsonSerialize() {
    return (object) $this->feeds;
  }
}
