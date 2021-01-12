from django.core.mail import EmailMultiAlternatives
from djangoRestReactShop.settings import EMAIL_HOST_USER, BASE_WEBSITE_URL


def send_email(email, password):
    message = ''
    message += f'<div style="max-width: 320px;">'
    message += f'<br>'
    message += f'<a href="{BASE_WEBSITE_URL}" target="_blank" style="font-size: 15px;">{BASE_WEBSITE_URL}</a>'
    message += f'<h3>Congratulations! You have successfully registered!</p>'
    message += f'<br>'
    message += f'<p>Email: { email }</p>'
    message += f'<p>Password: { password }</p>'
    message += f'<div/>'

    subject = 'Account was created!'

    msg = EmailMultiAlternatives(subject, subject, EMAIL_HOST_USER, [email])
    msg.attach_alternative(message, "text/html")
    msg.send()
