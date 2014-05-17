'''
Website Health Unit Tests.
'''
import copy
import os
import unittest
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.test import Client
from lxml import etree
from mock import Mock
from mock import patch
import models


class TestWebsiteHealth(unittest.TestCase):

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='test', email='test@example.com', password='password')
        self.user.save()
        self.client.login(username='test', password='password')
        self.website_name = 'sample_website'
        self.example_website_dict = {
            'url': 'http://example.com/',
            'name': self.website_name,
            'sitemap_url': 'http://example.com/sitemap.xml'}
        self.etree_parse_mock_patch = patch('lxml.etree.parse')
        self.etree_parse_mock = self.etree_parse_mock_patch.start()
        self.etree_parse_mock.side_effect = self.__mock_etree_parse

    def __mock_etree_parse(self, url, parser):
        path = os.path.join(os.path.dirname(os.path.realpath(__file__)),
                            'samples/%s.xml' % self.website_name)
        self.etree_parse_mock_patch.stop()
        etree.parse(path, parser)
        self.etree_parse_mock = self.etree_parse_mock_patch.start()
        self.etree_parse_mock.side_effect = self.__mock_etree_parse

    def test_main(self):
        response = self.client.get(reverse('show_websites'))
        self.assertEqual(response.status_code, 200)

    def test_website(self):
        website = self.__add_website(self.example_website_dict)
        response = self.client.get(website.get_absolute_url())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(50, len(website.get_links()))
        resp = self.client.get(reverse(
            'delete_website',
            kwargs={'pk': website.id}))
        self.assertEqual(resp.status_code, 200)
        resp = self.client.post(reverse(
            'delete_website',
            kwargs={'pk': website.id}))
        self.assertEqual(resp.status_code, 302)
        self.assertEqual(len(models.WebsiteHealthChecker.objects.all()), 0)

    def __add_website(self, website_dict):
        websites = models.WebsiteHealthChecker.objects.all()
        num_websites = len(websites)
        resp = self.client.post(reverse('add_website'), website_dict)
        self.assertEqual(302, resp.status_code)
        websites = models.WebsiteHealthChecker.objects.order_by('-pk')
        new_num_websites = len(websites)
        self.assertEqual(num_websites + 1, new_num_websites)
        return websites[0]

    def _edit_website(self, website_id, website_dict):
        resp = self.client.get(reverse('edit_website',
                                       args=(website_id,)))
        self.assertEqual(resp.status_code, 200)
        websites = models.WebsiteHealthChecker.objects.all()
        num_websites = len(websites)
        resp = self.client.post(reverse('edit_website',
                                        args=(website_id,)),
                                website_dict)
        self.assertEqual(302, resp.status_code)
        websites = models.WebsiteHealthChecker.objects.all()
        new_num_websites = len(websites)
        self.assertEqual(num_websites, new_num_websites)
        website = models.WebsiteHealthChecker.objects.get(pk=website_id)
        return website

    def test_edit_website(self):
        website = self.__add_website(self.example_website_dict)
        self.assertEqual(website.url, 'http://example.com/')
        new_website_dict = copy.deepcopy(self.example_website_dict)
        new_website_dict['url'] = 'http://example1.com/'
        website = self._edit_website(website.id, new_website_dict)
        self.assertEqual(website.url, 'http://example1.com/')

    @patch('urllib2.urlopen')
    def test_health(self, mock_urlopen):
        '''
        Tests the health view.
        '''
        mock_response = Mock()
        mock_response.getcode.return_value = 200
        mock_urlopen.return_value = mock_response
        website = self.__add_website(self.example_website_dict)
        self.assertEqual(50, len(website.get_links()))
        for link in website.get_links():
            resp = self.client.post(reverse('website_health'),
                                    {'link_url': link.link})
            self.assertEqual(resp.status_code, 200)
            self.assertTrue(resp)

    def tearDown(self):
        self.user.delete()
        self.etree_parse_mock_patch.stop()
