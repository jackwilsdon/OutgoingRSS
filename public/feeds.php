<?php

// Load libraries from outside the root directory.
require_once __DIR__ . '/../lib/bootstrap.php';

// Create a new feed handler with a cache outside the root directory.
$handler = new CachedRSSFeedHandler(__DIR__ . '/../cache');

// Add some feeds.
$handler->addFeed('http://feeds.feedburner.com/techcrunch/startups.xml');
$handler->addFeed('http://api.flickr.com/services/feeds/photos_public.gne?tags=computers&format=rss_200');
$handler->addFeed('http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk');

// Output the content type for the JSON response and encode the handler.
header('Content-Type: application/json');
echo json_encode($handler);
