FROM gradle:6.7.1-jdk15 as builder
USER root
RUN mkdir -p /var/build
WORKDIR /var/build
COPY ./gradlew build.gradle settings.gradle /var/build/
COPY backend/ /var/build/backend/
RUN gradle build --no-daemon

FROM openjdk:15.0-slim
WORKDIR /var/backend
COPY --from=builder /var/build/backend/build/libs/*  /var/backend
EXPOSE 8080
CMD java -jar *.jar

