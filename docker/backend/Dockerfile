FROM java:8
COPY config/* /var/backend/config/
WORKDIR /var/backend
COPY libs/*  /var/backend
EXPOSE 8080
CMD java -jar *.jar

