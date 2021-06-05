FROM node:14.15.1-alpine3.12 as builder

# set working directory
RUN mkdir -p /var/backend
WORKDIR /var/backend

# install and cache app dependencies
COPY backend/package*.json /var/backend/
RUN npm install

# add app
COPY backend/  /var/backend

ENTRYPOINT [ "npx", "ts-node", "index.ts" ]
