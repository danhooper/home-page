from django.forms import Form
from django.forms import ModelForm
import models


class WebsiteHealthCheckerForm(ModelForm):

    class Meta:
        model = models.WebsiteHealthChecker
        exclude = ['user']


class DeleteWebsiteHealthCheckerForm(Form):

    pass
