# First Stage: Build Dependencies
FROM python:3.11-slim as builder
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y \
    build-essential \
    netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*


# Second Stage: Python Dependencies
FROM python:3.11-slim as py-dependencies-builder

WORKDIR /var/www
COPY --from=builder /usr/local /usr/local
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt psycopg2-binary
COPY ./.flaskenv .


# Final Stage: Application Runtime
FROM python:3.11-slim
ENV PYTHONUNBUFFERED=1

WORKDIR /var/www

# Copy Python environment from py-dependencies-builder stage
COPY --from=py-dependencies-builder /usr/local /usr/local

# Copy application code and other necessary files
COPY ./migrations ./migrations
COPY ./app ./app
# This will be the ./react-app/builds folder for legacy builds using CRA
COPY ./react-vite/dist ./react-vite/dist
COPY entrypoint.sh /entrypoint.sh

# Setup permissions and user
# You could get rid of user, but it's "best practices" to include a user
RUN chmod +x /entrypoint.sh && \
    useradd -m myuser
USER myuser
# RUN chmod +x /entrypoint.sh
# Set entrypoint and command
ENTRYPOINT ["/entrypoint.sh"]
CMD ["gunicorn", "app:app"]
