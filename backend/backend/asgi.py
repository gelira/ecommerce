"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os
import dotenv
from pathlib import Path
from django.core.asgi import get_asgi_application

BASE_DIR = Path(__file__).resolve().parent.parent

dotenv.read_dotenv(BASE_DIR / '.env')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_asgi_application()
