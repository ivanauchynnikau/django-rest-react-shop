from django.core.mail import EmailMultiAlternatives
from djangoRestReactShop.settings import EMAIL_HOST_USER, BASE_WEBSITE_URL


def send_email(email, password):
    message = (
        f'<div style="max-width: 320px;">{email}'
        f'<br>'
        f'<a href="{BASE_WEBSITE_URL}" target="_blank" style="font-size: 15px;">{BASE_WEBSITE_URL}</a>'
        f'<h3>Congratulations! You have successfully registered!</h3>'
        f'<br>'
        f'<p>Email: {email}</p><p>Password: {password}</p>'
        f'<div/>'
    )

    subject = 'Account was created!'

    msg = EmailMultiAlternatives(subject, subject, EMAIL_HOST_USER, [email])
    msg.attach_alternative(message, "text/html")
    msg.send()
