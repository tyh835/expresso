#!/bin/sh
set -e

while ! nc -z postgres 5432; do
    echo "waiting for postgres..."
    sleep 1;
done

if [ "$NODE_ENV" != prod ]; then
  yarn migrate
fi

exec "$@"