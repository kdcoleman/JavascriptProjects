from django.urls import path

from . import views

app_name = 'login'
urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('extend/', views.extend_session, name='extend'),
    path('<int:user_id>/home/', views.home, name='home'),
]
