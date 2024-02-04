from django.urls import path
from base.views.order_views import AddOrderView, GetOrdersView, AllOrdersView


urlpatterns = [
    path('add/', AddOrderView.as_view(), name='add'),
    path('user-orders/', GetOrdersView.as_view(), name='user-orders'),
    path('all-orders/', AllOrdersView.as_view(), name='all'),
]
