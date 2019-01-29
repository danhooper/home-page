#!/bin/bash

rm -fR nginx/home-page
mkdir -p nginx/home-page
cp ../frontend/dist/home-page/* nginx/home-page/
docker build -t home-page-frontend nginx

mkdir -p backend/config/
mkdir -p backend/libs/
cp ../config/* backend/config/
cp ../backend/build/libs/homepage-*.jar backend/libs/homepage.jar
docker build -t home-page-backend backend
