<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Documentation

## Migrations

```
    "migration:info": "npm run typeorm migration:show -- -d ./typeorm-cli.config.ts",
    "migration:run": "npm run typeorm migration:run -- -d ./typeorm-cli.config.ts",
    "migration:generate": "npm run typeorm -- -d ./typeorm-cli.config.ts migration:generate ./src/database/migrations/$npm_config_name",
    "migration:create": "npm run typeorm -- migration:create ./src/database/migrations/$npm_config_name",
    "migration:revert": "npm run typeorm -- -d ./typeorm-cli.config.ts migration:revert"
    
    npm run migration:create --name=create-markets-table
```

## Project

```
    "start": "nest start",
    "start:dev": "nest start --watch",
```
