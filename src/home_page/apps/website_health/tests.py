import unittest
from django.contrib.auth.models import User
from django.test import Client
import models

class TestWebsiteHealth(unittest.TestCase):

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='test', email='test@example.com', password='password')
        self.user.save()
        self.client.login(username='test', password='password')


    def test_main(self):
        response = self.client.get('/home_page/website_health/')
        self.assertEqual(response.status_code, 200)

    def test_website(self):
        website = models.WebsiteHealthChecker(
            user = self.user, url = 'http://example.com',
            sitemap_url = 'https://example.com/sitemap.xml',
            name = 'sample_website')
        website.save()
        response = self.client.get('/home_page/website_health/website/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(50, len(website.get_links()))

    def test_health(self):
        website = models.WebsiteHealthChecker(
            user = self.user, url = 'http://example.com',
            sitemap_url = 'https://example.com/sitemap.xml',
            name = 'sample_website')
        website.save()
        for link in website.get_links():
            resp = self.client.post('/home_page/website_health/health/',
                                    {'link_url': link.link})
            self.assertEqual(resp.status_code, 200)
            self.assertTrue(resp)

    def tearDown(self):
        self.user.delete()
