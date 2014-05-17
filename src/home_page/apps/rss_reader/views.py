import datetime
import os
from django.core.urlresolvers import reverse
from django.core.urlresolvers import reverse_lazy
from django.views.generic import View
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from reusable_django.views import FilterUserUpdateView
from reusable_django.views import UserCreateView
import forms
import models

class FeedsView(View):
    def get(self, request):
        rss_feeds = models.RSSFeed.objects.filter(user=request.user).all()
        return render_to_response('rss_reader/templates/main.html',
                                  {'rss_feeds': rss_feeds})

class FeedView(View):
    def get(self, request, feed_id):
        feed_id = int(feed_id)
        rss_feed = models.RSSFeed.objects.filter(user=request.user).get(
            pk=feed_id)
        last_updated = datetime.datetime.now()
        return render_to_response('rss_reader/templates/feed.html',
                                  {'rss_feed': rss_feed,
                                   'last_updated': last_updated})


class FeedCreate(UserCreateView):
    model = models.RSSFeed
    form_class = forms.RSSFeedForm
    success_url = reverse_lazy('home')
    template_name = 'rss_reader/templates/edit_feed.html'


class FeedUpdate(FilterUserUpdateView):
    model = models.RSSFeed
    form_class = forms.RSSFeedForm
    success_url = reverse_lazy('home')
    template_name = 'rss_reader/templates/edit_feed.html'


class DeleteFeed(View):
    def post(self, request, feed_id=None):
        feed = models.RSSFeed.objects.filter(user=request.user).get(pk=feed_id)
        feed.delete()
        return HttpResponseRedirect(reverse('home'))

    def get(self, request, feed_id=None):
        feed = models.RSSFeed.objects.filter(user=request.user).get(pk=feed_id)
        form = forms.DeleteRSSFeedForm()
        return render_to_response('rss_reader/templates/delete_feed.html',
                                  {'feed': feed,
                                   'form': form},
                                  context_instance=RequestContext(request))

class Sample(View):
    def get(self, request, sample_name):
        path = os.path.join(os.path.dirname(os.path.realpath(__file__)),
                            'rss_samples/%s.xml' % sample_name)
        with open(path, 'r') as rss_sample:
            return HttpResponse(rss_sample.read(),
                                content_type='application/xhtml+xml')
