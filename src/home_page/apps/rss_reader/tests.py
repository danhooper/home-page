import os
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

    def test_feed(self):
        path = os.path.join(os.path.dirname(os.path.realpath(__file__)),
                            'rss_samples')
        files = os.listdir(path)
        for feed_file in files:
            feed_name = feed_file.split('.xml')[0]
            feed = models.RSSFeed(user = self.user,
                                  url='http://example.com',
                                  name= feed_name)
            feed.save()
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
