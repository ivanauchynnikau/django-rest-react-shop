[django-rest-react-shop.herokuapp.com](https://django-rest-react-shop.herokuapp.com/)

### Overview
Educational project, simple online store.
The project use Python, Django, Django REST Framework, Hermione.


### TODO
1. Add login via social networks (google, facebook)
2. Add to cart the ability to change the quantity of goods
3. Add TypeScript
4. Add pagination to the main page
5. Add slider for product page
6. Add search by products in header + dropdown with results
7. Add category menu to UI
8. Add filters to the catalog: by price, by category ...
9. Add logic for password recovery / reset
10. Add a blog, page of all articles, page of a separate article


### Requirements
* Ubuntu 18.04
* Python 3.6.1

### 1. Clone our repository
    git clone https://github.com/ivanauchynnikau/django-rest-react-shop.git
    cd django-rest-react-shop

### 2. Set up a python environment
We highly recommend installing [pyenv](https://github.com/pyenv/pyenv).
This tool helps you to install different versions of python and set up
virtual environments easily. Follow those instructions https://github.com/pyenv/pyenv-installer
to install `pyenv`. After installing, run this:

    pyenv install 3.6.1
    pyenv virtualenv 3.6.1 django-rest-react-shop-3.6.1
    pyenv local django-rest-react-shop-3.6.1

### 3. Activate virtual environment
    source /home/[YOUR_USERNAME]/.pyenv/versions/django-rest-react-shop-3.6.1/bin/activate

### 4. Install requirements
    pip install -r requirements.txt

### 6. Apply migrations
    python manage.py migrate

### 7. Create admin account
    python manage.py createsuperuser

### 8. Install frontend dependencies
    cd frontend
    npm i

### 9. Build frontend

    npm run dev
    npm run prod

### 10. Run server
    python manage.py runserver 0:8080

*Enjoy!*

***

### UI tests setup
    npm install -g node-gyp
    selenium-standalone install
    npm config set python /path/to/executable/python

**Hermione works fine with python 2.7*

Run selenium

    selenium-standalone start

If you will get error like No Java runtime present, requesting install. you should install Java Development Kit (JDK) for your OS.

To run tests

    npm run hermione

To run tests with GUI

    npm run hermione-gui

To update screenshots

    npm run hermione-update

***

### Run python tests
    python manage.py test

