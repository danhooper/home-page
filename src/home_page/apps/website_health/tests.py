import copy
import unittest
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.test import Client
import models


class TestWebsiteHealth(unittest.TestCase):

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='test', email='test@example.com', password='password')
        self.user.save()
        self.client.login(username='test', password='password')
        self.example_website_dict = {
            'url': 'http://example.com/',
            'name': 'sample_website',
            'sitemap_url': 'http://example.com/sitemap.xml'}

    def test_main(self):
        response = self.client.get(reverse('show_websites'))
        self.assertEqual(response.status_code, 200)

    def test_website(self):
        website = self.__add_website(self.example_website_dict)
        website.save()
        response = self.client.get(website.get_absolute_url())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(50, len(website.get_links()))

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
                                       kwargs={'website_id': website_id}))
        self.assertEqual(resp.status_code, 200)
        websites = models.WebsiteHealthChecker.objects.all()
        num_websites = len(websites)
        resp = self.client.post(reverse('edit_website',
                                        kwargs={'website_id': website_id}),
                                website_dict)
        self.assertEqual(302, resp.status_code)
        websites = models.WebsiteHealthChecker.objects.all()
        new_num_websites = len(websites)
        self.assertEqual(num_websites, new_num_websites)
        website = models.WebsiteHealthChecker.objects.get(pk=website_id)
        return website

    def test_add_website(self):
        response = self.client.get(reverse('add_website'))
        self.assertEqual(response.status_code, 200)
        self.__add_website(self.example_website_dict)

    def test_edit_website(self):
        website = self.__add_website(self.example_website_dict)
        self.assertEqual(website.url, 'http://example.com/')
        new_website_dict = copy.deepcopy(self.example_website_dict)
        new_website_dict['url'] = 'http://example1.com/'
        website = self._edit_website(website.id, new_website_dict)
        self.assertEqual(website.url, 'http://example1.com/')


    def test_health(self):
        '''
        Tests the health view.
        '''
        website = self.__add_website(self.example_website_dict)
        for link in website.get_links():
            resp = self.client.post(reverse('website_health'),
                                    {'link_url': link.link})
            self.assertEqual(resp.status_code, 200)
            self.assertTrue(resp)

    def tearDown(self):
        self.user.delete()
