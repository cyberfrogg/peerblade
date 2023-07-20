# PeerBlade
PeerBlade - is a community driven foss project.
This project implementing experemental all-in-one-repo by myself.

## Services list
- frontend - actual frontend of the website, that user see. Based on NextJS
- backend-users - controlls user sessions, user basic data, auth and registration
- backend-posts - controlls posts, creating, editing, feed.
- backend-assets - controlls and uploads user assets. Uses [imgstaz](https://github.com/cyberfrogg/imgstaz)

## How to run (DEV)

Requiremens:
- Podman
- Npm

To run app, you need to run every service with `npm run dev`.
To merge all app endpoints to single port, we use nginx. Nginx is already configured in `/nginx` folder.

To run nginx in podman container, use this command:
```sh
podman run --name peerblade_nginx \
    -p 8080:8080 \
    -p 5001:5001 \
    -p 5002:5002 \
    -p 5003:5003 \
    -p 5004:5004 \
    -p 5005:5005 \
    -v /path/to/project/nginx:/etc/nginx/conf.d:Z \
    -d docker.io/library/nginx
```
To start/restart nginx. Use `restart_nginx.sh` script


