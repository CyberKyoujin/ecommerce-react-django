from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from base.models import Product
from base.serializers import ProductSerializer

class AllProductsView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, context={'request': request}, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ProductView(APIView):
    def get(self, request):
        product_name = request.GET.get('product_name', None)
        if product_name is not None:
            products = Product.objects.filter(name__icontains=product_name)
            if products.exists():
                serializer = ProductSerializer(products, many=True, context={'request': request})
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'detail': 'No product name provided'}, status=status.HTTP_400_BAD_REQUEST)
        
class SingleProductView(APIView):
    def get(self, request, pk):
        try:
            product = Product.objects.get(id=pk)
            serializer = ProductSerializer(product, many=False, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({'detail': 'Product not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        
    
