cd $(dirname -- "$(readlink -f -- "$BASH_SOURCE")")

echo running container in prod mode
ls -la
chown root:root -R /home/node/app
npm install
echo installed all npm packages
npm run build
echo build successfull
echo starting app...
npm run start
