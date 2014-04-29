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
