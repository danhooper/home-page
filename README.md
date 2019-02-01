# Home Page
## Configuring
Create a file named `application.yml` in the `config/` directory.

A sample configuration file is in `config/sample-application.yml`. For now the ID must be unique.

## Running
`docker-compose up -d`

## Developing

### Frontend
`ng serve`

### Backend
`./gradlew build && java -jar backend/build/libs/homepage-0.1.0.jar`

## TODOs

- Generate feed IDs
- Hook up to DB
- CRUD for RSS feeds
- Versioning