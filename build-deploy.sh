set -e

REPO_BASE=${REPO_BASE:-us.gcr.io/dan-c-hooper}

docker-compose build
docker tag home-page-frontend "$REPO_BASE"/home-page-frontend
docker tag home-page-backend "$REPO_BASE"/home-page-backend
docker push "$REPO_BASE"/home-page-backend
docker push "$REPO_BASE"/home-page-frontend
