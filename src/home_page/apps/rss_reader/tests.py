'''
RSS Reader unit tests.
'''
import os
import unittest
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.test import Client
from .models import RSSFeed


class TestRSSReader(unittest.TestCase):

    def setUp(self):
        self.client = Client()
        self.user1 = User.objects.create_user(
            username='test', email='test@example.com', password='password')
        self.user1.save()
        self.user2 = User.objects.create_user(
            username='test2', email='test2@example.com', password='password')
        self.user2.save()
        self.client.login(username='test', password='password')
        self.example_feed_dict = {'url': 'http://example.com',
                                  'name': 'test',
                                  'rank': 1}

    def _login_user2(self):
        self.client.login(username='test2', password='password')

    def _get_sample_files(self):
        path = os.path.join(os.path.dirname(os.path.realpath(__file__)),
                            'rss_samples')
        files = os.listdir(path)
        return files

    def test_main(self):
        response = self.client.get(reverse('show_feeds'))
        self.assertEqual(response.status_code, 200)

    def _add_feed(self, feed_dict):
        feeds = RSSFeed.objects.all()
        num_feeds = len(feeds)
        resp = self.client.post(reverse('add_feed'), feed_dict)
        self.assertEqual(302, resp.status_code)
        feeds = RSSFeed.objects.order_by('-pk')
        new_num_feeds = len(feeds)
        self.assertEqual(num_feeds + 1, new_num_feeds)
        return feeds[0]

    def _edit_feed(self, feed_id, feed_dict):
        feeds = RSSFeed.objects.all()
        num_feeds = len(feeds)
        resp = self.client.post(reverse('edit_feed',
                                        kwargs={'pk': feed_id}),
                                feed_dict)
        self.assertEqual(302, resp.status_code)
        feeds = RSSFeed.objects.all()
        new_num_feeds = len(feeds)
        self.assertEqual(num_feeds, new_num_feeds)
        feed = RSSFeed.objects.get(pk=feed_id)
        return feed

    def test_feeds(self):
        '''
        Fairly comprehensive test adding feeds and testing various views.
        '''
        files = self._get_sample_files()
        for feed_file in files:
            feed_name = feed_file.split('.xml')[0]
            feed = self._add_feed(self.example_feed_dict)
            response = self.client.get(reverse('show_feed',
                                               args=(feed.id,)))
            self.assertEqual(response.status_code, 200)
        resp = self.client.get('/home_page/rss_reader/feed/add/')
        self.assertEqual(resp.status_code, 200)
        resp = self.client.get('/home_page/rss_reader/')
        self.assertEqual(resp.status_code, 200)
        feeds = RSSFeed.objects.all()
        for feed in feeds:
            delete_feed_url = reverse('delete_feed',
                                      kwargs={'pk': feed.id})
            resp = self.client.get(delete_feed_url)
            self.assertEqual(200, resp.status_code)
            resp = self.client.post(delete_feed_url)
            self.assertEqual(302, resp.status_code)
        feeds = RSSFeed.objects.all()
        self.assertEqual(0, len(feeds))

    def test_edit_feed(self):
        sample_file = self._get_sample_files()[0]
        feed_name = sample_file.split('.xml')[0]
        feed = self._add_feed(self.example_feed_dict)
        self.assertEqual(feed.rank, 1)
        feed = self._edit_feed(feed.id,
                               {'url': 'http://example.com',
                                'name': feed_name,
                                'rank': 2})
        self.assertEqual(feed.rank, 2)
        resp = self.client.get('/home_page/rss_reader/feed/edit/%d/' % feed.id)
        self.assertEqual(resp.status_code, 200)

    def test_sample(self):
        path = os.path.join(os.path.dirname(os.path.realpath(__file__)),
                            'rss_samples')
        files = os.listdir(path)
        for feed_file in files:
            feed_name = feed_file.split('.xml')[0]
            response = self.client.get(
                '/home_page/rss_reader/sample/%s/' % feed_name)
            self.assertEqual(response.status_code, 200)

    def test_user_permissions(self):
        feed = self._add_feed(self.example_feed_dict)
        self._login_user2()
        resp = self.client.get(reverse('show_feed', args=(feed.id,)))
        self.assertEqual(404, resp.status_code)
        resp = self.client.get(reverse('edit_feed', args=(feed.id,)))
        self.assertEqual(404, resp.status_code)

    def tearDown(self):
        self.user1.delete()
        self.user2.delete()
