from rest_framework.exceptions import MethodNotAllowed
from rest_framework.viewsets import ModelViewSet
from comercial.models import Compra
from comercial.serializers import (
    CompraCreateSerializer, 
    CompraRetrieveSerializer,
    CompraUpdateSerializer
)
from shared.permissions import DonoLojaPermission

class CompraViewSet(ModelViewSet):
    def get_queryset(self):
        qs = Compra.objects.filter(loja_id=self.request.GET['loja_id'])
        
        if not DonoLojaPermission().has_permission(self.request, self):
            qs = qs.filter(cliente_id=self.request.user.id)
        
        return qs.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return CompraCreateSerializer
        
        if self.action in ['update', 'partial_update']:
            return CompraUpdateSerializer
        
        return CompraRetrieveSerializer

    def destroy(self, request, *args, **kwargs):
        raise MethodNotAllowed(request.method)
