import unittest
from django.test import Client
import models

class TestRSSReader(unittest.TestCase):

    def setUp(self):
        self.client = Client()

    def test_feeds(self):
        response = self.client.get('/rss_reader/')
        self.assertEqual(response.status_code, 200)

    #def test_feed(self):
    #    feed = models.RSSFeed('url': 'http://example.com',
    #                          'name': 'test')
    #    feed.save()
    #    response = self.client.get('/rss_reader/feed/%d' % feed.id)

