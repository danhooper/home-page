test: unittest coverage

unittest:
	cd src/home_page; coverage run --source="." manage.py test
	cp src/home_page/.coverage ./

coverage:
	coverage report -m

collectstatic:
	cd src/home_page; ./manage.py collectstatic
