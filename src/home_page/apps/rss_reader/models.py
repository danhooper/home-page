from django.db import models
from django import forms
from django.core.urlresolvers import reverse
import feedparser


class Entry(object):
    def __init__(self, entry):
        self.entry = entry

    def content(self):
        if self.entry.get('content'):
            return self.entry.get('content')[0].get('value')
        if self.entry.get('summary'):
            return self.entry.get('summary')
        return str(self.entry)

    def __getattr__(self, name):
        return self.entry.get(name)


class RSSFeed(models.Model):
    url = models.URLField(max_length=500)
    name = models.CharField(max_length=200)
    rank = models.IntegerField(default=9999)
    website_url = models.CharField(max_length=200, blank=True)

    def get_absolute_url(self):
        return reverse('show_feed', args=(self.id,))

    def get_entries(self):
        feed = feedparser.parse(self.url)
        return [Entry(entry) for entry in feed.get('entries')]

    def __unicode__(self):
        return u'%s' % self.name

    class Meta:
        ordering = ['rank']


class RSSFeedForm(forms.ModelForm):

    class Meta:
        model = RSSFeed
