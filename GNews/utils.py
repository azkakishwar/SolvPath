from django.http import JsonResponse


def return_error(err):
    return JsonResponse({"error": err})
