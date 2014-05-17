from distutils.core import setup
import os

this_dir = os.path.dirname(os.path.realpath(__file__))
os.chdir(this_dir)

setup(
    name='reusable_django',
    version='0.0.1',
    author='Dan Hooper',
    author_email='dan.c.hooper@gmail.com',
    packages=['reusable_django'],
    url='http://pypi.python.org/pypi/reusable_django/',
    license='LICENSE.txt',
    description='Short reusable django classes and functions.',
    long_description=open(os.path.join(this_dir, 'README.txt')).read(),
    install_requires=[
        "Django >= 1.3.0",
    ],
)
