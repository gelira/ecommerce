from rest_framework_simplejwt.serializers import TokenObtainSerializer

class AccesTokenSerializer(TokenObtainSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        return {
            'token': data['access']
        }
