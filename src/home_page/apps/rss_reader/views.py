import datetime
import os
from django.core.urlresolvers import reverse
from django.views.generic import View
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
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

class FeedEdit(View):
    form = None

    def post(self, request, feed_id=None):
        if feed_id:
            feed_id = int(feed_id)
            rss_feed = models.RSSFeed.objects.filter(
                user=request.user).get(pk=feed_id)
            self.form = forms.RSSFeedForm(request.POST, instance=rss_feed)
        else:
            self.form = forms.RSSFeedForm(
                request.POST, initial={'user': request.user})
        if self.form.is_valid():
            feed = self.form.save(commit=False)
            feed.user = request.user
            feed.save()
            return HttpResponseRedirect(reverse('home'))
        return self.get(request, feed_id)

    def get(self, request, feed_id=None):
        if not self.form:
            if feed_id:
                feed_id = int(feed_id)
                rss_feed = models.RSSFeed.objects.filter(
                    user=request.user).get(pk=feed_id)
                self.form = forms.RSSFeedForm(instance=rss_feed)
            else:
                self.form = forms.RSSFeedForm()
        return render_to_response('rss_reader/templates/edit_feed.html',
                                  {'feed_form': self.form,
                                   'feed_id': feed_id},
                                  context_instance=RequestContext(request))

class DeleteFeed(View):
    def post(self, request, feed_id=None):
        feed = models.RSSFeed.objects.filter(user=request.user).get(pk=feed_id)
        feed.delete()
        return HttpResponseRedirect(reverse('home'))

    def get(self, request, feed_id = None):
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
