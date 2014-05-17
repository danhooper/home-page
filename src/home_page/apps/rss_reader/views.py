import datetime
import os
from django.core.urlresolvers import reverse
from django.core.urlresolvers import reverse_lazy
from django.views.generic import View
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from reusable_django.views import UserCreateView
from reusable_django.views import UserDeleteView
from reusable_django.views import UserUpdateView
import forms
import models

class FeedsView(View):
    def get(self, request):
        rss_feeds = models.RSSFeed.objects.filter(user=request.user).all()
        return render_to_response('rss_reader/main.html',
                                  {'rss_feeds': rss_feeds})

class FeedView(View):
    def get(self, request, feed_id):
        feed_id = int(feed_id)
        rss_feed = models.RSSFeed.objects.filter(user=request.user).get(
            pk=feed_id)
        last_updated = datetime.datetime.now()
        return render_to_response('rss_reader/feed.html',
                                  {'rss_feed': rss_feed,
                                   'last_updated': last_updated})


class FeedCreate(UserCreateView):
    model = models.RSSFeed
    form_class = forms.RSSFeedForm
    success_url = reverse_lazy('home')


class FeedUpdate(UserUpdateView):
    model = models.RSSFeed
    form_class = forms.RSSFeedForm
    success_url = reverse_lazy('home')


class DeleteFeed(UserDeleteView):
    model = models.RSSFeed
    success_url = reverse_lazy('home')

class Sample(View):
    def get(self, request, sample_name):
        path = os.path.join(os.path.dirname(os.path.realpath(__file__)),
                            'rss_samples/%s.xml' % sample_name)
        with open(path, 'r') as rss_sample:
            return HttpResponse(rss_sample.read(),
                                content_type='application/xhtml+xml')
