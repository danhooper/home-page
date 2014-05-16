'''
Website Health URLs
'''
# pylint: disable=invalid-name
from django.conf.urls import patterns
from django.conf.urls import url
from home_page.apps.website_health import views


urlpatterns = patterns(
    "",
    url(r"^$", views.WebsitesView.as_view(), name='show_websites'),
    url(r"^website/(\d+)/$", views.WebsiteView.as_view(), name='website_show'),
    url(r'^website/health/$', views.HealthView.as_view(),
        name='website_health'),
    url(r"^website/add/$", views.WebsiteEdit.as_view(), name='add_website'),
    url(r"^website/edit/(?P<website_id>\d+)/$", views.WebsiteEdit.as_view(),
        name='edit_website'),
    url(r"^website/delete/(?P<website_id>\d+)/$",
        views.DeleteWebsite.as_view(), name='delete_website'),
)
