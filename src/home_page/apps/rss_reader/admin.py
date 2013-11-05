from django.contrib import admin
from home_page.apps.rss_reader import models


class RSSFeedAdmin(admin.ModelAdmin):
    pass
admin.site.register(models.RSSFeed, RSSFeedAdmin)
