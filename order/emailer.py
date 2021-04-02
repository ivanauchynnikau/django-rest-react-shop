from django.core.mail import EmailMultiAlternatives
from djangoRestReactShop.settings import EMAIL_HOST_USER, BASE_WEBSITE_URL, AWS_STORAGE_BUCKET_NAME


def get_product_list_html(product_list):
    message = ''
    for product in product_list:
        message += (
            f'<p style="font-size: 22px;">{ product["title"] }</p>'
            f'<div><img style="max-width: 320px;" src="https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{ product["image"] }"></div>'
            f'<p>Description: { product["description"] }</p>'
            f'<p style="font-size: 18px;">Price: { product["price"] }</p>'
            f'<br><hr><br>'
        )

    return message


def send_email(recipient_mail, order_id, product_list):
    message = (
        f'<div style="max-width: 320px;">'
        f'<br>'
        f'<a href="{BASE_WEBSITE_URL}" target="_blank" style="font-size: 15px;">{BASE_WEBSITE_URL}</a>'
        f'<br><hr>'
        f'{get_product_list_html(product_list)}'
        f'<div/>'
    )

    subject = f'Order №{order_id} was created.'

    msg = EmailMultiAlternatives(subject, subject, EMAIL_HOST_USER, [recipient_mail])
    msg.attach_alternative(message, "text/html")
    msg.send()
