from django.core.mail import EmailMultiAlternatives
from djangoRestReactShop.settings import EMAIL_HOST_USER, BASE_WEBSITE_URL, AWS_STORAGE_BUCKET_NAME


def send_email(recipient_mail, order_id, product_list):
    message = ''
    message += f'<div style="max-width: 320px;">'
    message += f'<br>'
    message += f'<a href="{BASE_WEBSITE_URL}" target="_blank" style="font-size: 15px;">{BASE_WEBSITE_URL}</a>'
    message += f'<br><hr>'

    for product in product_list:
        message += f'<p style="font-size: 22px;">{ product["title"] }</p>'
        message += f'<div><img style="max-width: 320px;" src="https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{ product["image"] }"></div>'
        message += f'<p>Description: { product["description"] }</p>'
        message += f'<p style="font-size: 18px;">Price: { product["price"] }</p>'
        message += f'<br><hr><br>'

    message += f'<div/>'

    subject = 'Order №{} was created.'.format(order_id)

    msg = EmailMultiAlternatives(subject, subject, EMAIL_HOST_USER, [recipient_mail])
    msg.attach_alternative(message, "text/html")
    msg.send()
