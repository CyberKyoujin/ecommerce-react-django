from django.urls import path
from base.views.product_views import AllProductsView, ProductView, SingleProductView


urlpatterns = [
    path('', AllProductsView.as_view(), name='products'),
    path('get-products-by-name/', ProductView.as_view(), name='get-products'),
    path('<str:pk>/', SingleProductView.as_view(), name='get-product'),
]
