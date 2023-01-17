#!/bin/sh
pwd
ls -la
echo "==================================== checkout to develop branch "
git reset --hard && git clean -df
git checkout develop && git fetch --all && git reset --hard origin/develop && git pull origin develop
rm .env && mv .env-dev .env

docker-compose -f docker-compose-dev.yml up -d --force-recreate --build tralvel-fe-dev