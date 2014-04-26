import datetime
from django.shortcuts import render_to_response
import models


def show_feeds(request):
    rss_feeds = models.RSSFeed.objects.all()
    return render_to_response('rss_reader/templates/main.html',
                              {'rss_feeds': rss_feeds})


def show_feed(request, feed_id):
    feed_id = int(feed_id)
    rss_feed = models.RSSFeed.objects.get(pk=feed_id)
    last_updated = datetime.datetime.now()
    return render_to_response('rss_reader/templates/feed.html',
                              {'rss_feed': rss_feed,
                               'last_updated': last_updated})
