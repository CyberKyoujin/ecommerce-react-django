from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from base.serializers import OrderItemSerializer, OrderSerializer
from base.models import Order, ShippingAddress, Product, OrderItem, Card

class AddOrderView(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        data = request.data
        
        order_items = data.get('order_items', [])
        if not order_items:
            return Response({'detail': 'No order items provided'}, status=status.HTTP_400_BAD_REQUEST)

        
        payment_method = Card.objects.get(id=data['payment_method'])
        shipping_address =  ShippingAddress.objects.get(id=data['shipping_address'])

        order = Order.objects.create(
            user=user,
            total_price=data['total_price'],
            payment_method=payment_method,
            shipping_address = shipping_address
        )

        order.save()

        for item_data in order_items:
          
            product = Product.objects.get(id=item_data['product'])
            OrderItem.objects.create(
                order=order,
                product=product,
                qty=item_data['quantity'],
                price=item_data['price']
            )
    
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GetOrdersView(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        orders = user.orders.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AllOrdersView(APIView):
    def get(self, request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)