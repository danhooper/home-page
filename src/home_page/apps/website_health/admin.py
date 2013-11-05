from django.contrib import admin
import models


class WebsiteHealthCheckerAdmin(admin.ModelAdmin):
    pass
admin.site.register(models.WebsiteHealthChecker, WebsiteHealthCheckerAdmin)
