from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
    path('admin', admin.site.urls),
    # TODO delete after implement custm auth
    path('auth/', include('djoser.urls')),
    # TODO delete after implement custm auth
    path('auth/', include('djoser.urls.authtoken')),
    path('api/v1/accounts/', include('accounts.urls')),
    path('api/v1/products/', include('product.urls')),
    path('api/v1/categories/', include('category.urls')),
    path('api/v1/orders/', include('order.urls')),
    path('', include('frontend.urls')),
]
