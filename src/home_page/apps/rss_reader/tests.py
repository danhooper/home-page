'''
RSS Reader unit tests.
'''
import os
import unittest
from django.contrib.auth.models import User
from django.test import Client
from .models import RSSFeed


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

    def _add_feed(self, feed_dict):
        feeds = RSSFeed.objects.all()
        num_feeds = len(feeds)
        resp = self.client.post('/home_page/rss_reader/feed/add/', feed_dict)
        self.assertEqual(302, resp.status_code)
        feeds = RSSFeed.objects.order_by('-pk')
        new_num_feeds = len(feeds)
        self.assertEqual(num_feeds + 1, new_num_feeds)
        return feeds[0]

    def test_feed(self):
        path = os.path.join(os.path.dirname(os.path.realpath(__file__)),
                            'rss_samples')
        files = os.listdir(path)
        for feed_file in files:
            feed_name = feed_file.split('.xml')[0]
            feed = self._add_feed({'url': 'http://example.com',
                                   'name': feed_name,
                                   'rank': 1})
            response = self.client.get(
                '/home_page/rss_reader/feed/%d/' % feed.id)
            self.assertEqual(response.status_code, 200)

    def test_sample(self):
        path = os.path.join(os.path.dirname(os.path.realpath(__file__)),
                            'rss_samples')
        files = os.listdir(path)
        for feed_file in files:
            feed_name = feed_file.split('.xml')[0]
            response = self.client.get(
                '/home_page/rss_reader/sample/%s/' % feed_name)
            self.assertEqual(response.status_code, 200)

    def tearDown(self):
        self.user.delete()
