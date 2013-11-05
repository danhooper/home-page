from django.conf.urls.defaults import url, patterns
import views


urlpatterns = patterns("",
    url(r"^$", views.show_websites, name='websites'),
    url(r"^website/(\d+)/$", views.show_website, name='website'),
    url(r'^health/$', views.health, name='health'),
)
