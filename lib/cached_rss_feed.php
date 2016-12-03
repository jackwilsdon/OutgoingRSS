<?php

require_once __DIR__ . '/rss_feed.php';

/**
 * A cached RSS feed.
 *
 * The cache duration is 15 minutes for this feed.
 */
final class CachedRSSFeed extends RSSFeed {
  const CACHE_DURATION = 15 * 60 * 1000;

  private $address;
  private $cacheFile;

  /**
   * Constructs a new cached RSS feed for the provided address and cache file.
   *
   * @param string $address the address of the RSS feed
   * @param string $cacheFile the path of the file to store the cached XML in
   */
  public function __construct($address, $cacheFile) {
    $this->address = $address;
    $this->cacheFile = $cacheFile;
  }

  /**
   * Returns whether or not the cache is valid for this feed.
   *
   * A cache is seen as valid if it meets the following criteria:
   *
   * <ul>
   *   <li>The file is readable (according to <code>is_readable</code>)</li>
   *   <li>The modify date of the file is valid</li>
   *   <li>The modify date of the file is not in the future</li>
   *   <li>The modify date is no longer than <code>CACHE_DURATION</code>
   *       milliseconds in the past.</li>
   * </ul>
   *
   * @return boolean whether or not the cache is valid for this feed
   */
  private function isCacheValid() {
    if (is_readable($this->cacheFile)) {
      $currentTime = time();
      $modifyTime = filemtime($this->cacheFile);
      $deltaTime = $currentTime - $modifyTime;

      // Check that the file has a modify date, that it's in the past and that
      // it's under CACHE_DURATION milliseconds ago.
      return $modifyTime !== false && $currentTime > $modifyTime &&
             $deltaTime < $this::CACHE_DURATION;
    } else {
      return false;
    }
  }

  /**
   * Returns a new root XML element for this feed.
   *
   * This method also caches the retrieved XML so that it may be retrieved in
   * the future if it is deemeed valid.
   *
   * @return SimpleXMLElement the new root XML element for this feed
   */
  private function getNewXML() {
    $contents = file_get_contents($this->address);

    $cacheDirectory = dirname($this->cacheFile);

    // If the cache directory doesn't exist then make it.
    if (!file_exists($cacheDirectory)) {
      mkdir($cacheDirectory, 0777, true);
    }

    // Store the XML response in the cache file.
    file_put_contents($this->cacheFile, $contents);

    return new SimpleXMLElement($contents);
  }

  /**
   * Returns the cached root XML element for this feed.
   *
   * @return SimpleXMLElement the cached root XML element for this feed
   */
  private function getCachedXML() {
    $contents = file_get_contents($this->cacheFile);
    return new SimpleXMLElement($contents);
  }

  /**
   * Returns the root XML element for this feed.
   *
   * This may be a cached element if there is a cache file and it meets the
   * criteria set by <code>isCacheValid</code>.
   *
   * @return SimpleXMLElement the root XML element for this feed.
   */
  protected function getXML() {
    if ($this->isCacheValid()) {
      return $this->getCachedXML();
    } else {
      return $this->getNewXML();
    }
  }
}
