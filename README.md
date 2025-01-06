# To run the application in local
```
npm run start
```
# User Data Model 

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
