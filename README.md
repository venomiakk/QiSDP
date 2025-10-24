# qsdp

Quality in Software Development Process

Tests will be performed on https://github.com/testsmith-io/practice-software-testing.git

# prerequisites

## project

```bash
git clone https://github.com/testsmith-io/practice-software-testing.git
```

## db migrations

```bash
docker compose exec mariadb sh -lc "mysql -u user -proot -e 'SHOW DATABASES; USE toolshop; SHOW TABLES;'"

docker compose exec laravel-api php artisan migrate --force
docker compose exec laravel-api php artisan db:seed --force

docker compose exec -e DB_HOST=mariadb laravel-api php artisan migrate --force
docker compose exec -e DB_HOST=mariadb laravel-api php artisan db:seed --force
```

## api tests

- postman

- newman

```bash
npm install newman

newman run xxx.postman_collection.json
```
