===============
Reusable Django
===============

Reusable Django is a library of generic views and functions useful in Django
development.

Installing
==========

Installation is simple::

    pip install reusable_django

Available Classes and Functions
===============================

views.py
--------

FilterUserUpdateView provides a filter on updating models that only the
current user owns.  The model must have the attribute user defined.::

    from reusable_django.views import FilterUserUpdateView

    class MyUpdateView(FilterUserUpdateView)
