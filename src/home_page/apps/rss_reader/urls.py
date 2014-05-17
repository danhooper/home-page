'''
RSS Reader URLs
'''
# pylint: disable=invalid-name
from django.conf.urls import patterns
from django.conf.urls import url
from home_page.apps.rss_reader import views


urlpatterns = patterns(
    "",
    url(r"^$", views.FeedsView.as_view(), name="show_feeds"),
    url(r"^feed/(\d+)/$", views.FeedView.as_view(), name='show_feed'),
    url(r"^feed/add/$", views.FeedCreate.as_view(), name='add_feed'),
    url(r"^feed/edit/(?P<pk>\d+)/$", views.FeedUpdate.as_view(),
        name='edit_feed'),
    url(r"^feed/delete/(?P<feed_id>\d+)/$", views.DeleteFeed.as_view(),
        name='delete_feed'),
    url(r"^sample/(\w+)/$", views.Sample.as_view(), name='sample'),
)
