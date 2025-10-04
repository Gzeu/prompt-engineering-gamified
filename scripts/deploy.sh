#!/bin/bash

# Prompt Engineering Gamified - Deployment Script
# This script handles production deployment

set -e

echo "🚀 Deploying Prompt Engineering Gamified Platform..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Make sure you're in the project root directory."
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please create one from .env.example"
    exit 1
fi

# Load environment variables
source .env

# Validate required environment variables
if [ -z "$JWT_SECRET" ]; then
    echo "❌ JWT_SECRET is not set in .env file"
    exit 1
fi

if [ -z "$NEXT_PUBLIC_APP_URL" ]; then
    echo "❌ NEXT_PUBLIC_APP_URL is not set in .env file"
    exit 1
fi

echo "✅ Environment variables validated"

# Install dependencies
echo "📦 Installing production dependencies..."
npm ci --only=production

# Install backend dependencies
cd backend
npm ci --only=production
cd ..

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Build backend
echo "🔨 Building backend..."
cd backend
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Backend build failed"
    exit 1
fi

cd ..

echo "✅ Backend build completed successfully"

# Check if PM2 is available for process management
if command -v pm2 &> /dev/null; then
    echo "📋 Starting application with PM2..."
    
    # Stop existing processes if any
    pm2 delete prompt-craft-frontend 2>/dev/null || true
    pm2 delete prompt-craft-backend 2>/dev/null || true
    
    # Start frontend
    pm2 start npm --name "prompt-craft-frontend" -- start
    
    # Start backend
    cd backend
    pm2 start npm --name "prompt-craft-backend" -- start
    cd ..
    
    # Save PM2 configuration
    pm2 save
    pm2 startup
    
    echo "✅ Application started with PM2"
    echo "Frontend: http://localhost:3000"
    echo "Backend: http://localhost:5000"
    echo ""
    echo "Monitor with: pm2 monit"
    echo "View logs: pm2 logs"
    echo "Restart: pm2 restart all"
    
else
    echo "📋 Starting application in production mode..."
    echo "Frontend will start on port 3000"
    echo "Backend will start on port 5000"
    echo ""
    echo "To start the application:"
    echo "1. Frontend: npm start"
    echo "2. Backend: cd backend && npm start"
    echo ""
    echo "Consider installing PM2 for better process management:"
    echo "npm install -g pm2"
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo "🚀 Your Prompt Engineering Gamified Platform is ready!"