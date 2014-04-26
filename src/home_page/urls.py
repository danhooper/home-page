'''
Main urls.
'''
# pylint: disable=invalid-name
# pylint: disable=no-value-for-parameter
from django.conf import settings
from django.conf.urls import include
from django.conf.urls import patterns
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from home_page.apps.rss_reader import urls as rss_reader_urls
from home_page.apps.website_health import urls as website_health_urls
admin.autodiscover()


handler500 = "pinax.views.server_error"


urlpatterns = patterns(
    "",
    url(r"^$", TemplateView.as_view(template_name="homepage.html"),
        name="home"),
    url(r"^admin/", include(admin.site.urls)),
    url(r'^%s/accounts/' % settings.SITE_ROOT,
        include('account.urls')),
    (r'^rss_reader/', include(rss_reader_urls)),
    (r'^website_health/', include(website_health_urls)),
)


if settings.SERVE_MEDIA:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
