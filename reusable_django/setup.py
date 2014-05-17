from distutils.core import setup

setup(
    name='reusable_django',
    version='0.0.1',
    author='Dan Hooper',
    author_email='dan.c.hooper@gmail.com',
    packages=['reusable_django'],
    url='http://pypi.python.org/pypi/reusable_django/',
    license='LICENSE.txt',
    description='Short reusable django classes and functions.',
    long_description=open('README.txt').read(),
    install_requires=[
        "Django >= 1.3.0",
    ],
)
