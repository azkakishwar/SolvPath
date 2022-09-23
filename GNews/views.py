from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.utils.http import urlencode
from .utils import return_error
from django.views.decorators.cache import cache_page

import requests
import environ
import json

env = environ.Env()


def index(request):
    """
    Returns Index page for GNews API
    """
    return render(request, 'GNews/index.html')


# cache enabled for one year
@cache_page(31536000)
def top_news(request):
    """
    Send API call to retrieve top news articles from GNews API based on input parameters.
    Input parameters includes
        max: number of articles to fetch. maximum number can be 20
        lang: two letter language code
    Cache the request so user is not fetching same results over and over.
    Returns error or result of the API
    """

    max_articles = request.GET.get('max')
    if int(max_articles) < 1 or int(max_articles) > 20:
        return return_error("Number of articles are invalid.")

    url = "https://gnews.io/api/v4/top-headlines"

    querystring = {
        "token": env('API_TOKEN'),
        "max": max_articles,
        "lang": request.GET.get('lang')
    }

    response = requests.request("GET", url, params=querystring)

    resp = json.loads(response.text)

    if 'errors' in resp:
        return return_error(resp['errors'])
    else:
        return JsonResponse({"articles": resp['articles']})


def search_news(request):
    """
    Send API call to search news articles from GNews API based on input parameters.
    Input parameters includes
        q: keyword to search for
        in: where to search in. Possible value can be title, content or description
        max: number of articles to fetch. maximum number can be 20
        lang: two letter language code
    Returns error or result of the API
    """
    max_articles = request.GET.get('max')
    if int(max_articles) < 1 or int(max_articles) > 20:
        return return_error("Number of articles are invalid.")

    search_in = request.GET.get('in')
    if search_in == "" or search_in is None:
        return return_error("Please select at least one option to search in.")
    elif search_in not in ['title', 'content', 'description']:
        return return_error("Please select valid value for search in. Possible values can be title, content or "
                            "description.")

    url = "https://gnews.io/api/v4/search"

    q = request.GET.get('q')

    # removing " if any
    q = q.replace("\"", "")

    # enclosing in quotation marks if string contains anything other than alphabet or space
    if not all(x.isalpha() or x.isspace() for x in q):
        q = "\"" + q + "\""

    querystring = {
        "q": q,
        "token": env('API_TOKEN'),
        "in": search_in,
        "max": max_articles,
        "lang": request.GET.get('lang')
    }
    response = requests.request("GET", url, params=urlencode(querystring))

    resp = json.loads(response.text)
    if 'errors' in resp:
        return JsonResponse({"errors": resp['errors']})
    else:
        return JsonResponse({"articles": resp['articles']})
