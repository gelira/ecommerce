from rest_framework.exceptions import MethodNotAllowed
from rest_framework.viewsets import ModelViewSet
from comercial.models import Compra
from comercial.serializers import (
    CompraCreateSerializer, 
    CompraRetrieveSerializer,
    CompraUpdateSerializer
)

class CompraViewSet(ModelViewSet):
    def get_queryset(self):
        qs = Compra.objects.filter(loja_id=self.request.GET['loja_id'])
        
        if self.request.user.role != 'dono':
            qs = qs.filter(cliente_id=self.request.user.id)
        
        return qs.all()

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
