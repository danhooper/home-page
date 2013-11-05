import site
site.addsitedir('/home/dhooper/virtualenv/home_page/lib/python2.7/site-packages')
import os
import sys
curr_path = os.path.dirname(os.path.abspath(__file__))
path_site = os.path.abspath(os.path.join(curr_path, '..', 'src'))
other_path_site = os.path.abspath(os.path.join(curr_path, '..', 'src', 'home_page'))
if path_site not in sys.path:
    sys.path.append(path_site)
if other_path_site not in sys.path:
    sys.path.append(other_path_site)
os.environ['DJANGO_SETTINGS_MODULE'] = 'home_page.settings'

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()

