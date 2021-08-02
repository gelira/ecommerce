from rest_framework.exceptions import APIException

class LojaNaoInformadaException(APIException):
    status_code = 400
    default_detail = 'id da loja não informado'
