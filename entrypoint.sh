#!/bin/sh

Check if FLASK_ENV is set to "production"
if [ "$FLASK_ENV" = "production" ]; then
    # Production-specific commands
    echo "Running in production mode..."
    echo "Waiting for PostgreSQL to start..."
    echo "You may need to increase the sleep duration if your web service begins before the db"

    sleep 3
    # Standard database migrations
    flask db upgrade
    flask seed undo
    flask seed all

    # Start Gunicorn for production
    exec gunicorn app:app

else
    # Commands for local testing and non-production environments
    echo "Running in non-production mode..."
    echo "Waiting for PostgreSQL to start..."
    echo "You may need to increase the sleep duration if your web service begins before the db"

    sleep 3

    # Local development database setup
    flask db upgrade
    flask seed undo
    flask seed all

    # Start Gunicorn with binding for local testing
    exec gunicorn app:app --bind 0.0.0.0:8000
fi
