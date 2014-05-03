import datetime
import os
from django.core.urlresolvers import reverse
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
import forms
import models


def show_feeds(request):
    rss_feeds = models.RSSFeed.objects.filter(user=request.user).all()
    return render_to_response('rss_reader/templates/main.html',
                              {'rss_feeds': rss_feeds})


def show_feed(request, feed_id):
    feed_id = int(feed_id)
    rss_feed = models.RSSFeed.objects.filter(user=request.user).get(pk=feed_id)
    last_updated = datetime.datetime.now()
    return render_to_response('rss_reader/templates/feed.html',
                              {'rss_feed': rss_feed,
                               'last_updated': last_updated})


def edit_feed(request, feed_id=None):
    form = None
    if request.method == 'POST':
        if feed_id:
            feed_id = int(feed_id)
            rss_feed = models.RSSFeed.objects.filter(
                user=request.user).get(pk=feed_id)
            form = forms.RSSFeedForm(request.POST, instance=rss_feed)
        else:
            form = forms.RSSFeedForm(
                request.POST, initial={'user': request.user})
        if form.is_valid():
            feed = form.save(commit=False)
            feed.user = request.user
            feed.save()
            return HttpResponseRedirect(reverse('home'))
    if not form:
        if feed_id:
            feed_id = int(feed_id)
            rss_feed = models.RSSFeed.objects.filter(
                user=request.user).get(pk=feed_id)
            form = forms.RSSFeedForm(instance=rss_feed)
        else:
            form = forms.RSSFeedForm()
    return render_to_response('rss_reader/templates/edit_feed.html',
                              {'feed_form': form},
                              context_instance=RequestContext(request))


def sample(request, sample_name):
    path = os.path.join(os.path.dirname(os.path.realpath(__file__)),
                        'rss_samples/%s.xml' % sample_name)
    with open(path, 'r') as rss_sample:
        return HttpResponse(rss_sample.read(),
                            content_type='application/xhtml+xml')
