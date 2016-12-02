<?php

require_once __DIR__ . '/feed_handler.php';

final class CachedRSSFeedHandler extends FeedHandler {
  private $cacheDirectory;

  public function __construct($cacheDirectory) {
    $this->cacheDirectory = $cacheDirectory;
  }

  public function createFeed($address) {
    $key = md5($address);
    $cacheFile = $this->cacheDirectory . '/' . $key . '.xml';

    if (!file_exists($this->cacheDirectory)) {
      mkdir($this->cacheDirectory, 0777, true);
    }

    return new CachedRSSFeed($address, $cacheFile);
  }
}
