cd $(dirname -- "$(readlink -f -- "$BASH_SOURCE")")

echo running container in dev mode
ls -la
chown root:root -R /home/node/app
npm install
echo installed all npm packages
npm run dev
echo npm dev run complete
