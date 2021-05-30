set -e

REPO_BASE=${REPO_BASE:-us.gcr.io/dan-c-hooper}

docker-compose build frontend
docker tag home-page-frontend "$REPO_BASE"/home-page-frontend
docker push "$REPO_BASE"/home-page-frontend

