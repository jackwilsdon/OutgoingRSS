<?php

require_once __DIR__ . '/../lib/bootstrap.php';

$handler = new CachedRSSFeedHandler(__DIR__ . '/../cache');

$handler->addFeed('http://feeds.feedburner.com/techcrunch/startups.xml');
$handler->addFeed('http://api.flickr.com/services/feeds/photos_public.gne?tags=computers&format=rss_200');
$handler->addFeed('http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk');

header('Content-Type: application/json');
echo json_encode($handler);
