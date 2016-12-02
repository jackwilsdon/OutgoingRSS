<?php

require_once __DIR__ . '/rss_feed.php';

final class CachedRSSFeed extends RSSFeed {
  const CACHE_DURATION = 15 * 60 * 1000;

  private $address;
  private $cacheFile;

  public function __construct($address, $cacheFile) {
    $this->address = $address;
    $this->cacheFile = $cacheFile;
  }

  private function isCacheValid() {
    if (is_readable($this->cacheFile)) {
      $currentTime = time();
      $modifyTime = filemtime($this->cacheFile);
      $deltaTime = $currentTime - $modifyTime;

      return $modifyTime !== false && $currentTime > $modifyTime &&
             $deltaTime < $this::CACHE_DURATION;
    } else {
      return false;
    }
  }

  private function getNewXML() {
    $contents = file_get_contents($this->address);

    $cacheDirectory = dirname($this->cacheFile);

    if (!file_exists($cacheDirectory)) {
      mkdir($cacheDirectory, 0777, true);
    }

    file_put_contents($this->cacheFile, $contents);

    return new SimpleXMLElement($contents);
  }

  private function getCachedXML() {
    $contents = file_get_contents($this->cacheFile);
    return new SimpleXMLElement($contents);
  }

  protected function getXML() {
    if ($this->isCacheValid()) {
      return $this->getCachedXML();
    } else {
      return $this->getNewXML();
    }
  }
}
