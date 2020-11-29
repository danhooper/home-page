#!/bin/sh

cd /var/home_page
./gradlew build --continuous --no-daemon &
./gradlew bootRun --no-daemon
