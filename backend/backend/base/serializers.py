from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, ShippingAddress, Card, OrderItem, UserProfile


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        
        UserProfile.objects.create(user=user)
        
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
        
class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image_url(self, obj):
        request = self.context.get('request', None)
        if request:
            return request.build_absolute_uri(obj.image.url)
        else:
            return obj.image.url if obj.image else None
        
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=False)
    class Meta:
        model = OrderItem
        fields = "__all__"
        
        
class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'
        
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'
        
        
class OrderSerializer(serializers.ModelSerializer):
    
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    paymentMethod = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'
    
    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        return OrderItemSerializer(items, many=True, context=self.context).data

    def get_shippingAddress(self, obj):
        try:
            address = obj.shipping_address
            return ShippingAddressSerializer(address, many=False).data
        except ShippingAddress.DoesNotExist:
            return None

    def get_user(self, obj):
        user = obj.user
        return UserSerializer(user, many=False).data

    def get_paymentMethod(self, obj):
        payment_method = obj.payment_method
        return CardSerializer(payment_method, many=False).data
    
class UserProfileSerializer(serializers.ModelSerializer):
    
    profile_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = UserProfile
        fields = ['user', 'profile_image', 'profile_image_url', 'location']
        
    def get_profile_image_url(self, obj):
        if obj.profile_image:
            return self.context['request'].build_absolute_uri(obj.profile_image.url)
        return None
        
    def update(self, instance, validated_data):
        instance.profile_image = validated_data.get('profile_image', instance.profile_image)
        instance.location = validated_data.get('location', instance.location)
        instance.save()
        return instance