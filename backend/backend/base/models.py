from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    discount_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    
    def __str__(self) -> str:
        return self.name
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    location = models.CharField(max_length=50, null=True, blank=True)


class Card(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cards', null=True)
    card_number = models.CharField(max_length=19, null=True, blank=True)  # Card numbers can be up to 19 digits long
    payment_system = models.CharField(max_length=255, null=True, blank=True)
    card_owner = models.CharField(max_length=255, null=True, blank=True)
    
    def __str__(self) -> str:
        return self.card_owner + ' ' + self.card_number
    
class ShippingAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shipping_addresses', null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    street = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    zip_code = models.CharField(max_length=20, null=True, blank=True)
    
    def __str__(self):
        return f"{self.street}, {self.city}, {self.zip_code}, {self.country}"

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders', null=True)
    order_date = models.DateField(auto_now_add=True, null=True, blank=True)
    shipping_address = models.ForeignKey(ShippingAddress, on_delete=models.SET_NULL, null=True)
    total_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    payment_method = models.ForeignKey(Card, on_delete=models.SET_NULL, null=True)
    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    

    
    