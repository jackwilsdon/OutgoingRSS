<?php

require_once __DIR__ . '/feed_handler.php';

/**
 * A <code>FeedHandler</code> for <code>CachedRSSFeed</code> objects.
 */
final class CachedRSSFeedHandler extends FeedHandler {
  private $cacheDirectory;

  /**
   * Constructs a new cached feed handler with the specified cache directory.
   *
   * @param string $cacheDirectory the directory to store feed caches in
   */
  public function __construct($cacheDirectory) {
    $this->cacheDirectory = $cacheDirectory;
  }

  /**
   * Returns a new <code>CachedRSSFeed</code> for the specified address.
   *
   * @param string $address the address for the feed
   * @return CachedRSSFeed the feed for the specified address
   */
  public function createFeed($address) {
    // Use the md5 of the address as the filename so we can easily check if
    // a cached file exists using only the address.
    $key = md5($address);
    $cacheFile = $this->cacheDirectory . '/' . $key . '.xml';

    // If the cache directory doesn't exist then make it.
    if (!file_exists($this->cacheDirectory)) {
      mkdir($this->cacheDirectory, 0777, true);
    }

    return new CachedRSSFeed($address, $cacheFile);
  }
}
