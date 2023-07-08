# PeerBlade Backend Users

## Setup MySQL DB

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
```sql
CREATE TABLE emailVerificationTokens (
    uuid VARCHAR(36) DEFAULT "" NOT NULL,
    useruuid VARCHAR(36) DEFAULT "" NOT NULL,
    token VARCHAR(500) DEFAULT "" NOT NULL,
    isverified TINYINT DEFAULT 0 NOT NULL,
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (uuid),
    FOREIGN KEY (useruuid) REFERENCES users(uuid)
);
```
```sql
CREATE TABLE sessions (
    uuid VARCHAR(36) DEFAULT "" NOT NULL,
    useruuid VARCHAR(36) DEFAULT "" NOT NULL,
    token VARCHAR(500) DEFAULT "" NOT NULL,
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (uuid),
    FOREIGN KEY (useruuid) REFERENCES users(uuid)
);
```