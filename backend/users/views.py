from rest_framework.views import APIView, Response
from .serializers import AddressCreateSerializer, UserSerializer, UserRegisterSerializer, AddressSerializer
from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveAPIView, CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny

# Create your views here.
User = get_user_model()


class UserRegisterView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer

    def post(self, request):

        user_register_serializer = UserRegisterSerializer(data=request.data)
        user_register_serializer.is_valid(raise_exception=True)

        user = user_register_serializer.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=201)


class UserView(RetrieveAPIView):

    serializer_class = UserSerializer
    lookup_field = "id"

    def get_object(self):
        return self.request.user


class AddressCreateView(CreateAPIView):
    serializer_class = AddressCreateSerializer


class AddressView(ListAPIView):
    serializer_class = AddressSerializer

    def get_queryset(self):
        return self.request.user.addresses.all()


class AddressDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    lookup_field = "id"

    def get_queryset(self):
        return self.request.user.addresses.all()

    def check_object_permissions(self, request, obj):
        if obj.user != request.user:
            self.permission_denied(request)
