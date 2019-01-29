# Partially copied from https://mherman.org/blog/dockerizing-an-angular-app/

#########################
### build environment ###
#########################

# base image
FROM node:lts-alpine as builder

# set working directory
RUN mkdir -p /var/opt/frontend/src/app
WORKDIR /var/opt/frontend/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /var/opt/frontend/src/app:$PATH

# install and cache app dependencies
COPY frontend/package.json /var/opt/frontend/src/app/
COPY frontend/package-lock.json /var/opt/frontend/src/app/
RUN npm install
RUN npm install -g @angular/cli@7.2.3 --unsafe

# add app
COPY frontend/ /var/opt/frontend/src/app/

# generate build
RUN npm run build

#########################
### NGINX             ###
#########################

FROM nginx:alpine

COPY --from=builder /var/opt/frontend/src/app/dist/home-page/ /var/www
COPY docker/frontend/nginx.conf /etc/nginx/nginx.conf
