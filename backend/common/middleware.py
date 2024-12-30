import time
from django.conf import settings


class SlowMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        time.sleep(settings.ARTIFICIAL_DELAY)  # Add a 3-second delay
        response = self.get_response(request)
        return response
