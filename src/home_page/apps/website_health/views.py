import json
from django.core.urlresolvers import reverse
from django.core.urlresolvers import reverse_lazy
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from django.views.generic.edit import CreateView
from django.views.generic.edit import FormView
from reusable_django.views import FilterUserUpdateView
import forms
import models


class WebsitesView(View):

    def get(self, request):
        websites = models.WebsiteHealthChecker.objects.filter(
            user=request.user).all()
        return render_to_response('website_health/templates/main.html',
                                  {'websites': websites})


class WebsiteView(View):

    def get(self, request, website_id):
        website_id = int(website_id)
        website = models.WebsiteHealthChecker.objects.filter(
            user=request.user).get(pk=website_id)
        return render_to_response('website_health/templates/website.html',
                                  {'website': website})


class HealthView(View):

    @csrf_exempt
    def post(self, request):
        link_url = request.POST['link_url']
        link = models.WebsitePage(link_url)
        response_data = {'health': link.get_health()}
        return HttpResponse(json.dumps(response_data),
                            content_type="application/json")


class WebsiteCreate(CreateView):
    model = models.WebsiteHealthChecker
    form_class = forms.WebsiteHealthCheckerForm
    success_url = reverse_lazy('home')
    template_name = 'website_health/templates/edit_website.html'

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(WebsiteCreate, self).form_valid(form)


class WebsiteUpdate(FilterUserUpdateView):
    model = models.WebsiteHealthChecker
    form_class = forms.WebsiteHealthCheckerForm
    success_url = reverse_lazy('home')
    template_name = 'website_health/templates/edit_website.html'

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(WebsiteUpdate, self).form_valid(form)


class DeleteWebsite(View):

    def post(self, request, website_id):
        website = models.WebsiteHealthChecker.objects.filter(
            user=request.user).get(pk=website_id)
        website.delete()
        return HttpResponseRedirect(reverse('home'))

    def get(self, request, website_id):
        website = models.WebsiteHealthChecker.objects.filter(
            user=request.user).get(pk=website_id)
        form = forms.DeleteWebsiteHealthCheckerForm()
        return render_to_response(
            'website_health/templates/delete_website.html',
            {'website': website,
             'form': form},
            context_instance=RequestContext(request))
