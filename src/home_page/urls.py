from django.conf import settings
from django.conf.urls.defaults import *
from django.views.generic.simple import direct_to_template
import apps.rss_reader.urls
import apps.website_health.urls
from django.contrib import admin
admin.autodiscover()


handler500 = "pinax.views.server_error"


urlpatterns = patterns("",
    url(r"^$", direct_to_template, {
        "template": "homepage.html",
    }, name="home"),
    url(r"^admin/", include(admin.site.urls)),
    (r'^rss_reader/', include(apps.rss_reader.urls)),
    (r'^website_health/', include(apps.website_health.urls)),
)


if settings.SERVE_MEDIA:
    urlpatterns += patterns("",
        url(r"", include("staticfiles.urls")),
    )
