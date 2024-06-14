# middleware.py
# class RemoveApiKeyHeaderMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         # Create a copy of the headers and remove the X-Api-Key header if it exists
#         headers = {key: value for key, value in request.headers.items() if key != 'X-Api-Key'}
#         request.headers = headers
        
#         response = self.get_response(request)
#         return response