# PeerBlade
PeerBlade - is a community driven FOSS project.
This project implementing experimental all-in-one-repo by myself.

## Services list
- frontend - actual frontend of the website, that user see. Based on **NextJS**
- backend-users - controls user sessions, user basic data, auth and registration
- backend-posts - controls posts, creating, editing, feed.
- backend-assets - controls and uploads user assets. Uses [imgstaz](https://github.com/cyberfrogg/imgstaz)

## External services
* Cloudflare captcha (turnstile)

## How to run (DEV)

Requirements:
- Podman

Every service is spinning up in podman containers inside of a single pod.

1. Copy `config.sh.template` to `config.sh` and configure `config.sh` file.
2. Start all services. Use `./restart-and-run.sh dev start`
3. Frontend should appear on 8080 port by default. Look into `journalctl -f` or `podman ps` to debug issues.

### One time MySQL setup
1. Attach to bash session `podman exec -it peerblade_mysql /bin/bash`
2. `mysql -p`
3. Enter root password
4. You should enter MySQL shell.
5. Execute this command in MySQL shell: `ALTER USER 'CREDENTIALS_MYSQL_USERNAME'@'%' IDENTIFIED WITH mysql_native_password BY 'CREDENTIALS_MYSQL_PASSWORD'`
