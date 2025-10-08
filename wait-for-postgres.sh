#!/bin/sh
set -e

host="$1"
shift
cmd="$@"

until PGPASSWORD="todo_man12345" psql -h "$host" -U "todo_man" -d "todo" -c '\q' 2>/dev/null; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Postgres is up - executing command"
exec $cmd