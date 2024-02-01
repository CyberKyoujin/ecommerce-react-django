from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token
from rest_framework_simplejwt.views import TokenObtainPairView
from base.serializers import UserRegisterSerializer, UserSerializer, UserProfileSerializer, ShippingAddressSerializer, CardSerializer
from base.models import UserProfile, ShippingAddress, Card
from rest_framework.decorators import api_view, permission_classes, parser_classes


class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
# JWT Views

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['date_joined'] = str(user.date_joined)
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

# USER VIEWS

class UserView(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def user_profile_view(request):
    
    try:
        user_profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        return Response({"message": "UserProfile not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserProfileSerializer(user_profile, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        print(request.data)
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
# GET VIEWS 
       
class UserAdressesView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        adresses = ShippingAddress.objects.filter(user=user)
        serializer = ShippingAddressSerializer(adresses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserCardsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        cards = Card.objects.filter(user=user)
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# DELETE VIEWS

class DeleteAdressView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, pk):
        shipping_adress = ShippingAddress.objects.get(user=request.user, id=pk)
        shipping_adress.delete()
        return Response(status=status.HTTP_200_OK)
    
    
class DeleteCardView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, pk):
        card = Card.objects.get(user=request.user, id=pk)
        card.delete()
        return Response(status=status.HTTP_200_OK)
    
# CREATE VIEWS

class CreateAddressView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ShippingAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CreateCardView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
            

        