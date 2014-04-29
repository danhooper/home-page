import unittest
from django.contrib.auth.models import User
from django.test import Client
import models

class TestRSSReader(unittest.TestCase):

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='test', email='test@example.com', password='password')
        self.user.save()
        self.client.login(username='test', password='password')


    def test_feeds(self):
        response = self.client.get('/home_page/rss_reader/')
        self.assertEqual(response.status_code, 200)

    #def test_feed(self):
    #    feed = models.RSSFeed('url': 'http://example.com',
    #                          'name': 'test')
    #    feed.save()
    #    response = self.client.get('/rss_reader/feed/%d' % feed.id)

