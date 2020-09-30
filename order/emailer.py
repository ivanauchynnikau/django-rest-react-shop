from django.core.mail import EmailMultiAlternatives
from djangoRestReactShop.settings import EMAIL_HOST_USER, BASE_WEBSITE_URL


def send_email(recipient_mail, order_id, product_list):
    message = ''
    for product in product_list:
        message += f'<a href="{BASE_WEBSITE_URL}" target="_blank" style="font-size: 30px;">DJANGOSHOP.COM</a>'
        message += f'<p style="font-size: 22px;">{ product["title"] }</p>'
        message += f'<div><img src="{ product["image"] }"></div>'
        message += f'<p>Description: { product["description"] }</p>'
        message += f'<p style="font-size: 18px;">Price: { product["price"] }</p>'
        message += f'<br><hr><br>'

    subject = 'Order №{} was created.'.format(order_id)

    msg = EmailMultiAlternatives(subject, subject, EMAIL_HOST_USER, [recipient_mail])
    msg.attach_alternative(message, "text/html")
    msg.send()
