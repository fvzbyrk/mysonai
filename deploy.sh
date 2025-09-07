#!/bin/bash

# MySonAI Deployment Script
echo "🚀 Starting MySonAI deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Start the application
    echo "🌐 Starting application..."
    npm start
else
    echo "❌ Build failed!"
    exit 1
fi
