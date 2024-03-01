# syntax=docker/dockerfile:1

# First stage: Python image for the server
FROM python:3.12.2-slim as server

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app/server

# Copy requirements file and install dependencies
COPY server/requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.txt

COPY . .

# Second stage: Node.js image for the client
FROM node:latest as client

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY . .

# Final stage: Combine server and client
FROM server as final

# Expose port
EXPOSE 8000

# Define command to start the server
CMD gunicorn 'server.app:app' --bind=0.0.0.0:8000
