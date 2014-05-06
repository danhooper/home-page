'''
Website Health URLs
'''
# pylint: disable=invalid-name
from django.conf.urls import patterns
from django.conf.urls import url
from home_page.apps.website_health import views


urlpatterns = patterns(
    "",
    url(r"^$", views.show_websites, name='show_websites'),
    url(r"^website/(\d+)/$", views.show_website, name='website_show'),
    url(r'^website/health/$', views.health, name='website_health'),
    url(r"^website/add/$", views.edit_website, name='add_website'),
    url(r"^website/edit/(?P<website_id>\d+)/$", views.edit_website,
        name='edit_website'),
    url(r"^website/delete/(?P<website_id>\d+)/$", views.delete_website,
        name='delete_website'),
)
