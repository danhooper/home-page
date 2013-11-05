from django.conf.urls.defaults import url, patterns
import views


urlpatterns = patterns("",
    url(r"^$", views.show_feeds, name="show_feeds"),
    url(r"^feed/(\d+)/$", views.show_feed, name='show_feed')
)
