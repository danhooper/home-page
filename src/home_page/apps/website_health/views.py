import json
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import models


def show_websites(request):
    websites = models.WebsiteHealthChecker.objects.filter(
        user=request.user).all()
    return render_to_response('website_health/templates/main.html',
                              {'websites': websites})


def show_website(request, website_id):
    website_id = int(website_id)
    website = models.WebsiteHealthChecker.objects.filter(
        user=request.user).get(pk=website_id)
    return render_to_response('website_health/templates/website.html',
                              {'website': website})


@csrf_exempt
def health(request):
    if request.POST:
        link_url = request.POST['link_url']
        link = models.WebsitePage(link_url)
        response_data = {'health': link.get_health()}
        return HttpResponse(json.dumps(response_data),
                            mimetype="application/json")

def edit_website(request, website_id=None):
    form = None
    if request.method == 'POST':
        if website_id:
            website_id = int(website_id)
            website = models.WebsiteHealthChecker.objects.filter(
                user=request.user).get(pk=website_id)
            form = models.WebsiteHealthCheckerForm(request.POST,
                                                   instance=website)
        else:
            form = models.WebsiteHealthCheckerForm(
                request.POST, initial={'user': request.user})
        if form.is_valid():
            feed = form.save(commit=False)
            feed.user = request.user
            feed.save()
            return HttpResponseRedirect(reverse('home'))
    if not form:
        if website_id:
            website_id = int(website_id)
            website = models.WebsiteHealthChecker.objects.filter(
                user=request.user).get(pk=website_id)
            form = models.WebsiteHealthCheckerForm(instance=website)
        else:
            form = models.WebsiteHealthCheckerForm()
    return render_to_response('website_health/templates/edit_website.html',
                              {'website_form': form,
                               'website_id': website_id},
                              context_instance=RequestContext(request))


def delete_website(request, website_id):
    website = models.WebsiteHealthChecker.objects.filter(
        user=request.user).get(pk=website_id)
    if request.method == 'POST':
        website.delete()
        return HttpResponseRedirect(reverse('home'))
    form = forms.DeleteWebsiteHealthCheckerForm()
    return render_to_response('website_health/templates/delete_website.html',
                              {'website': website,
                               'form': form},
                              context_instance=RequestContext(request))

