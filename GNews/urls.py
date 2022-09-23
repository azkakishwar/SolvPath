from django.urls import path
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    # ex: /gnews/
    path(r'', views.index, name='index'),
    path(r'top-news/', views.top_news, name='top-news'),
    path(r'search-news/', views.search_news, name='search-news')
]

urlpatterns += staticfiles_urlpatterns()
