from django.conf import settings as django_settings


def settings(request):
    return {
        'VERSION': django_settings.VERSION,
        'ENVIRONMENT': django_settings.ENVIRONMENT,
    }
