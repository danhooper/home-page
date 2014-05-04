'''
RSS Reader URLs
'''
# pylint: disable=invalid-name
from django.conf.urls import patterns
from django.conf.urls import url
from home_page.apps.rss_reader import views


urlpatterns = patterns(
    "",
    url(r"^$", views.show_feeds, name="show_feeds"),
    url(r"^feed/(\d+)/$", views.show_feed, name='show_feed'),
    url(r"^feed/add/$", views.edit_feed, name='add_feed'),
    url(r"^feed/edit/(?P<feed_id>\d+)/$", views.edit_feed, name='edit_feed'),
    url(r"^sample/(\w+)/$", views.sample, name='sample'),
)
