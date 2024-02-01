from django.urls import path
from base.views.user_views import UserRegisterView, MyTokenObtainPairView, UserView, user_profile_view, UserAdressesView, UserCardsView, DeleteAdressView, DeleteCardView, CreateAddressView, CreateCardView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('token-refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('user-data/', UserView.as_view(), name='user'),
    path('profile/', user_profile_view, name='user_profile'),
    path('adresses/', UserAdressesView.as_view(), name='user_adresses'),
    path('cards/', UserCardsView.as_view(), name='cards'),
    path('delete-adress/<int:pk>/', DeleteAdressView.as_view(), name='delete-adress'),
    path('delete-card/<int:pk>/', DeleteCardView.as_view(), name='delete-card'),
    path('create-address/', CreateAddressView.as_view(), name='create-adress'),
    path('create-card/', CreateCardView.as_view(), name='create-card'),
]
