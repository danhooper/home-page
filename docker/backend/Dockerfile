FROM gradle:5.1.1-jdk8-alpine as builder
USER root
RUN mkdir -p /var/build
WORKDIR /var/build
COPY ./gradlew /var/build/
COPY build.gradle /var/build/
COPY settings.gradle /var/build/
COPY backend/ /var/build/backend/
RUN ls -R /var/build/
RUN gradle build

FROM java:8
COPY config/* /var/backend/config/
WORKDIR /var/backend
COPY --from=builder /var/build/backend/build/libs/*  /var/backend
EXPOSE 8080
CMD java -jar *.jar

