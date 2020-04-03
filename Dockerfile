FROM python:3.8.1-slim-buster

WORKDIR /home/django-rest-react-shop
RUN apt-get update && \
    apt-get install --no-install-recommends -y gcc linux-libc-dev libc6-dev libjpeg-dev zlib1g-dev && \
    pip3 install --upgrade pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
COPY requirements.txt /home/django-rest-react-shop/
RUN pip3 install --no-cache -r requirements.txt
CMD python /home/django-rest-react-shop/manage.py migrate && \
    python /home/django-rest-react-shop/manage.py runserver 0.0.0.0:8000
EXPOSE 8000
