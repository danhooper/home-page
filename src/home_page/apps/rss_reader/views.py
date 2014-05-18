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
from reusable_django.views import UserDetailView
from reusable_django.views import UserListView
from reusable_django.views import UserUpdateView
import forms
import models


class FeedsView(UserListView):
    model = models.RSSFeed


class FeedView(UserDetailView):
    model = models.RSSFeed

    def get_context_data(self, **kwargs):
        context = super(FeedView, self).get_context_data(**kwargs)
        context['last_updated'] = datetime.datetime.now()
        return context


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
