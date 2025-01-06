# Set .env in local with values
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456789
DB_NAME=gvcc
DB_PORT=3306
JWT_SECRET=654789
SERVER_PORT=8082

# create user Data Model in MySQL

```
CREATE TABLE IF NOT EXISTS `user` (
  `id` CHAR(36) NOT NULL,
  `full_name` VARCHAR(255) NULL,
  `email` VARCHAR(100) NULL,
  `password_hash` VARCHAR(255) NULL,
  `role` ENUM('admin', 'regular') DEFAULT 'regular',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE (`email`)
  )
ENGINE = InnoDB;
```

# To run the application in local
```
npm run start
```

# API Endpoints
## Authenticatation APIs

* POST: /v1/api/register
##
## body
```
{
    "full_name": "Travis Head",
    "email":"travis@gmail.com",
    "password":"something"
}

``` 
* POST: /v1/api/login
##
## body
```
{
    "email":"travis@gmail.com",
    "password":"something"
}

``` 
* POST: /v1/api/refresh
##
## expects access token through Bearer header or refresh token through cookies
