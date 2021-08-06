"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
from django.urls import path
from rest_framework.routers import SimpleRouter

from acesso import views as acesso_views
from estoque import views as estoque_views
from comercial import views as comercial_views

router = SimpleRouter(trailing_slash=False)
router.register('api/produtos', estoque_views.ProdutoViewSet, basename='produtos')
router.register('api/compras', comercial_views.CompraViewSet, basename='compras')

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('api/token', acesso_views.AccessTokenView.as_view()),
    path('api/cliente', acesso_views.CreateClienteView.as_view()),
    path('api/info', acesso_views.InfoView.as_view()),
    path('api/loja', estoque_views.LojaView.as_view()),
] + router.urls
