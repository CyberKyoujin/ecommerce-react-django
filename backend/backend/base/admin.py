from django.contrib import admin
from base.models import Product, Order, Card, ShippingAddress, OrderItem, UserProfile


admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Card)
admin.site.register(ShippingAddress)
admin.site.register(OrderItem)
admin.site.register(UserProfile)
