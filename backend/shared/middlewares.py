from django.http.response import JsonResponse

ALLOW_URLS = [
    '/api/token',
    '/api/cliente',
    '/api/info',
    '/api/loja',
]

class LojaIdMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def allow_url(self, request):
        for url in ALLOW_URLS:
            if request.path.startswith(url):
                return True
        return False

    def __call__(self, request):
        if not self.allow_url(request) and not request.GET.get('loja_id'):
            return JsonResponse(
                data={ 'detail': 'id da loja não informado' },
                status=400
            )
        
        return self.get_response(request)
