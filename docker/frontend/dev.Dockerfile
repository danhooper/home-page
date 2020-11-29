# Partially copied from https://mherman.org/blog/dockerizing-an-angular-app/

#########################
### build environment ###
#########################

# base image
FROM node:14.15.1-alpine3.12 as builder

# set working directory
RUN mkdir -p /var/home_page/frontend
WORKDIR /var/home_page/frontend

RUN npm install -g @angular/cli@11.0.2 --unsafe

# Serve frontend
CMD npm i && ng serve --host 0.0.0.0