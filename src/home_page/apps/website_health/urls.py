'''
Website Health URLs
'''
# pylint: disable=invalid-name
from django.conf.urls import patterns
from django.conf.urls import url
from home_page.apps.website_health import views


urlpatterns = patterns(
    "",
    url(r"^$", views.show_websites, name='websites'),
    url(r"^website/(\d+)/$", views.show_website, name='website'),
    url(r'^health/$', views.health, name='health'),
)
