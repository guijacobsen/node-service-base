#!/usr/bin/env bash

# function AptUpdate() {
#     apt-get -y update;
# }

####################################################################################################################################################################################
## Intalando docker
# sudo apt-get update;
# sudo apt-get install  apt-transport-https  ca-certificates  curl  gnupg-agent  software-properties-common;
# sudo apt-get install docker-ce docker-ce-cli containerd.io

####################################################################################################################################################################################
## Intalando utils
# AptUpdate;
apt-get -y update;

apt-get -y install wget nano vim unzip curl tree;
apt-get install -y net-tools;

# AptUpdate;
apt-get -y update;

####################################################################################################################################################################################
## Intalando nginx
#wget http://nginx.org/keys/nginx_signing.key && \
#echo "deb http://nginx.org/packages/mainline/ubuntu/ xenial nginx" >> /etc/apt/sources.list && \
#echo "deb-src http://nginx.org/packages/mainline/ubuntu/ xenial nginx" >> /etc/apt/sources.list && apt-key add ./nginx_signing.key;

#AptUpdate;

apt-get install -y nginx && systemctl enable nginx;

# AptUpdate;
apt-get -y update;

mkdir /etc/nginx/sites-available;
mkdir /etc/nginx/sites-enabled;

#service nginx stop;

#sudo ufw allow 80 && sudo ufw allow 443;
#ufw enable;

####################################################################################################################################################################################
## Install node
apt-get -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_10.x | bash
apt-get install -y nodejs yarn;
# AptUpdate;
apt-get -y update;

## Install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# AptUpdate;
apt-get -y update;

apt-get install yarn -y

npm i -g pm2

# AptUpdate;
apt-get -y update;

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

# source /root/.bashrc;
# nvm install 10.16.3;
# nvm use 10.16.3;

# source /root/.bashrc && nvm install 10.16.3 && nvm use 10.16.3
# source /home/ubuntu/.bashrc && nvm install 10.16.3 && nvm use 10.16.3

####################################################################################################################################################################################