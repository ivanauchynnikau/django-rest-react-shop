from django.core.mail import EmailMultiAlternatives
from djangoRestReactShop.settings import EMAIL_HOST_USER, BASE_WEBSITE_URL


def send_email(email, password):
    message = ''
    message += f'<a href="{BASE_WEBSITE_URL}" target="_blank" style="font-size: 30px;">DJANGOSHOP.COM</a>'
    message += f'<p>Email: { email }</p>'
    message += f'<p>Password: { password }</p>'
    message += f'<br><hr><br>'

    subject = 'Your account was created.'

    msg = EmailMultiAlternatives(subject, subject, EMAIL_HOST_USER, [email])
    msg.attach_alternative(message, "text/html")
    msg.send()
