FROM gradle:6.7.1-jdk15 as builder
USER root
EXPOSE 8080
RUN mkdir -p /var/home_page
WORKDIR /var/home_page
CMD /var/home_page/docker/backend/start.sh

