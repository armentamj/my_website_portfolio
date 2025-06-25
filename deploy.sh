#!/bin/bash

git pull
docker compose up -d --build
docker compose exec www rails db:migrate