from django.forms import ModelForm
import models

class RSSFeedForm(ModelForm):

    class Meta:
        model = models.RSSFeed
        exclude = ['user']
