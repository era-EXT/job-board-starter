#!/bin/bash

# Remove existing data directory
echo "Removing existing data directory..."
rm -rf data

# Create new data directory
echo "Creating new data directory..."
mkdir -p data

# Run database setup
echo "Setting up database..."
npm run db:push
npm run db:seed

echo "Database setup complete!" 