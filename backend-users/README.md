# Backend Users

## Setup Mysql DB

```sql
CREATE TABLE users (
    uuid VARCHAR(36) DEFAULT "" NOT NULL,
    nickname VARCHAR(30) DEFAULT "" NOT NULL,
    email VARCHAR(250) DEFAULT "" NOT NULL,
    password VARCHAR(50) DEFAULT "" NOT NULL,
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (uuid)
);
```