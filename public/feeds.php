<?php

require_once __DIR__ . '/../lib/bootstrap.php';

$feed_addresses = array(
  'http://feeds.feedburner.com/techcrunch/startups.xml',
  'http://api.flickr.com/services/feeds/photos_public.gne?tags=computers&format=rss_200',
  'http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk'
);

$feeds = array();

foreach ($feed_addresses as $address) {
  $id = md5($address);
  $cacheFile = __DIR__ . "/cache/$id.xml";

  $feeds[$id] = new CachedRSSFeed($address, $cacheFile);
}

header('Content-Type: application/json');
echo json_encode($feeds);
