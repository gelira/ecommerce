from rest_framework.permissions import BasePermission

from estoque.models import Loja

class DonoLojaPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.role != 'dono':
            return False
        
        return Loja.objects.filter(
            id=request.GET['loja_id'], 
            dono_id=request.user.id
        ).exists()
