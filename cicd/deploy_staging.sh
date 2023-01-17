#!/bin/sh
pwd
ls -la
echo "==================================== checkout to staging branch "
git reset --hard && git clean -df
git checkout staging && git fetch --all && git reset --hard origin/staging && git pull origin staging
rm .env && mv .env-staging .env

docker-compose -f docker-compose-staging.yml up -d --force-recreate --build tralvel-fe-staging