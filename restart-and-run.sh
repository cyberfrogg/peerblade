cd $(dirname -- "$(readlink -f -- "$BASH_SOURCE")")

# Repo Path
repoPath=`pwd`
echo "Project repository path:"
echo $repoPath
echo ""

# Mysql Runtime Path
mysqlRuntimeDataPath="${repoPath}/.mysqlruntimedatapath";
echo "MySQL Runtime Data Path:"
echo "${mysqlRuntimeDataPath}"
echo ""

# Nginx config
nginxConfdPath="${repoPath}/nginx"
echo "Nginx config:"
echo "${nginxConfdPath}"
echo ""

# Load config
source ./config.sh
echo "Website name:"
echo $conf_website_name

prod_or_dev_argument=$1
node_env="development"
node_container_target_script="run-dev.sh";

is_prod="true"
if [[ "${prod_or_dev_argument}" == "prod" ]]
then
	is_prod="true"
	node_env="production"
	node_container_target_script="run-prod.sh"
else
	is_prod="false"
	node_env="development"
	node_container_target_script="run-dev.sh"
fi

echo "Is Production: ${is_prod}"
echo "Target run script: ${node_container_target_script}"

# Deleting all containers
echo "STOPPING AND DELETING CONTAINERS"
podman stop peerblade_mysql
podman stop peerblade_backend_users
podman stop peerblade_nginx
podman rm peerblade_mysql
podman rm peerblade_backend_users
podman rm peerblade_nginx
echo "DELETING POD"
podman pod rm $conf_pod_name
podman network rm $conf_pod_network_name
echo "PODMAN CLEANUP COMPLETE"

if [[ $2 == "stop" ]]
then
	exit
else
	echo "continue"
fi

echo "-----------------------"

# starting pod. also exposing ports here
echo "STARTING POD"
podman network create $conf_pod_network_name
podman pod create \
	--name $conf_pod_name \
	-p 8080:8080 \
	-p 5001:5001 \
	-p 5002:5002 \
	-p 5003:5003 \
	-p 5004:5004 \
	-p 3306:3306 \
	--network $conf_pod_network_name
echo "POD STARTED"

# MySQL
podman run -d \
	--name peerblade_mysql \
	-v ${mysqlRuntimeDataPath}':/var/lib/mysql:Z' \
	-e MYSQL_ROOT_PASSWORD=$conf_mysql_rootpass \
	-e MYSQL_USER=$conf_mysql_user \
	-e MYSQL_PASSWORD=$conf_mysql_pass \
	--pod=$conf_pod_name \
	mysql:8

# Backend Users
podman run -d \
	--name peerblade_backend_users \
	-v ${repoPath}'/backend-users:/home/node/app:Z' \
	-e NODE_ENV=$node_env \
	-e PORT=$conf_backend_users_port \
	-e WEBSITE_CORS_URL=$conf_website_cors_url \
	-e WEBSITE_NAME=$conf_website_name \
	-e WEBSITE_URL=$conf_website_url \
	-e EMAIL_SMTP_HOST=$conf_email_smtp_host \
	-e EMAIL_SMTP_PORT=$conf_email_smtp_port \
	-e EMAIL_SMTP_USER=$conf_email_smtp_user \
	-e EMAIL_SMTP_PASS=$conf_email_smtp_pass \
	-e EMAIL_SMTP_FROM=$conf_email_smtp_from \
	-e DB_HOST=$conf_mysql_host \
	-e DB_PORT=$conf_mysql_port \
	-e DB_NAME=$conf_mysql_name \
	-e DB_PASS=$conf_mysql_pass \
	-e DB_IS_DEBUG=$conf_mysql_is_debug \
	-e DB_IS_TRACE=$conf_mysql_is_debug \
	--entrypoint="/bin/bash" \
	--pod=$conf_pod_name \
        node:18.15.0 \
        -c '/home/node/app/'${node_container_target_script}


# Nginx
podman run --name peerblade_nginx \
        -v ${nginxConfdPath}':/etc/nginx/conf.d:Z' \
        --pod=$conf_pod_name \
        -d docker.io/library/nginx
