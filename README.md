# Game Star Wars

Api of planets to star wars game.

This api contains:

- Unit tests;
- Based on clean architecture;
- [Documentation.](https://github.com/KelwinHenrique/game-star-wars/blob/main/DOCS.md)
- Docker

## How to run the project with docker

1) Update .env with your environments variables;

2) Run in the root project `sudo docker-compose up` to initialize the application.

3) Run the comands bellow in your terminal:

- List planets
```json
  curl -H "Content-Type: application/json" -X GET http://localhost:3000/planets?limit=2&page=1
```
Or access [this url](http://localhost:3000/planets?limit=2&page=1) in your broswer.

- Get planet by Id
```json
  curl -H "Content-Type: application/json" -X GET http://localhost:3000/planets/:id
```

- Get planet by Name
```json
  curl -H "Content-Type: application/json" -X GET http://localhost:3000/planets/by-name?name=Hoth
```

- Add Planet
```json
  curl -d '{ "name":"Bespin", "ground":"gas giant", "weather": "temperate" }' -H "Content-Type: application/json" -X POST http://localhost:3000/planets
```

- DElete planet by Id
```json
  curl -H "Content-Type: application/json" -X DELETE http://localhost:3000/planets/:id
```

## How to run tests

Run `npm run test` to execute all tests of the api.

## How to run documentation

1) Run `npm run docs` to create the documentation.

2) Enter the folder coverage/lcov-report and execute index.html

3) Or you can click [here](https://github.com/KelwinHenrique/game-star-wars/blob/main/DOCS.md)

## Architecture

```bash
├── src
│   ├── api
│   │   ├── planets
│   │   │   ├── services
│   │   │   │   |  ├── create-planet
│   │   │   │   |  |  ├── create-planet.service.ts
│   │   │   │   |  |  ├── create-planet.spec.ts
│   │   │   │   |  |  ├── index.ts
│   │   │   │   |  ├── delete-planet-by-id
│   │   │   │   |  |  ├── delete-planet-by-id.service.ts
│   │   │   │   |  |  ├── delete-planet-by-id.spec.ts
│   │   │   │   |  |  ├── index.ts
│   │   │   │   |  ├── get-all-planets
│   │   │   │   |  |  ├── get-all-planets.service.ts
│   │   │   │   |  |  ├── get-all-planets.spec.ts
│   │   │   │   |  |  ├── index.ts
│   │   │   │   |  ├── get-planet-by-id
│   │   │   │   |  |  ├── get-planet-by-id.service.ts
│   │   │   │   |  |  ├── get-planet-by-id.spec.ts
│   │   │   │   |  |  ├── index.ts
│   │   │   │   |  ├── get-planet-by-name
│   │   │   │   |  |  ├── get-planet-by-name.service.ts
│   │   │   │   |  |  ├── get-planet-by-name.spec.ts
│   │   │   │   |  |  ├── index.ts
│   │   │   │   ├── index.ts
│   │   │   ├── dtos
│   │   │   │   ├── body-planet.dto.ts
│   │   │   │   ├── planet.dto.ts
│   │   │   │   ├── query-paginate.dto.ts
│   │   │   │   │── index.ts
│   │   │   ├── planets.controller.ts
│   │   │   ├── planets.module.ts
│   │   │   ├── planets.repository.ts
│   │   │   ├── planets.schema.ts
│   │   ├── config
│   │   │   ├── config.module.ts
│   │   │   ├── config.service.ts
│   ├── app.module.ts
│   ├── main.ts
```

## Main Dependencies

- nestjs: Web framework.
- jest and supertest: Unit test.
- apiDoc and apidoc-markdown: To create documentation for this API.
