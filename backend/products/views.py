from rest_framework import generics
from .models import *
from .serializers import *

# Example View
# class ExampleListCreateView(generics.ListCreateAPIView):
#     queryset = YourModel.objects.all()
#     serializer_class = YourModelSerializer
