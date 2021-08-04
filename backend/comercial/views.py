from rest_framework.exceptions import MethodNotAllowed
from rest_framework.viewsets import ModelViewSet
from comercial.models import Compra
from comercial.exceptions import LojaNaoInformadaException
from comercial.serializers import (
    CompraCreateSerializer, 
    CompraRetrieveSerializer,
    CompraUpdateSerializer
)

class CompraViewSet(ModelViewSet):
    def get_queryset(self):
        loja_id = self.request.GET.get('loja_id')
        
        if not loja_id:
            raise LojaNaoInformadaException()

        return Compra.objects.filter(loja_id=loja_id).all()

    def get_serializer_class(self):
        if self.action == 'create':
            return CompraCreateSerializer
        
        if self.action in ['update', 'partial_update']:
            return CompraUpdateSerializer
        
        return CompraRetrieveSerializer

    def get_serializer_context(self):
        return super().get_serializer_context()

    def destroy(self, request, *args, **kwargs):
        raise MethodNotAllowed(request.method)
