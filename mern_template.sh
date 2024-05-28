#!/bin/bash

# Variables for the script
REPO_URL="https://github.com/HarshSharma20503/Mern_Auth_Email_Template/"
CLONE_DIR="Mern_Auth_Email_Template"
NEW_PROJECT_NAME="$1"

# Check if project name is provided
if [ -z "$NEW_PROJECT_NAME" ]; then
    echo "Please provide a name for the new project. e.g. ./mern_template test"
    exit 1
fi

# Check if git is installed
if ! command -v git &> /dev/null
then
    echo "Git is not installed. Please install git and try again."
    exit 1
fi

# Git is installed, proceed with cloning the repository
echo "Git found. Cloning the repository..."
git clone "$REPO_URL"

# Check if the clone was successful
if [ $? -ne 0 ]; then
    echo "Failed to clone the repository."
    exit 1
fi

echo "Repository cloned successfully."

# Rename the project directory
echo "Renaming the project directory to $NEW_PROJECT_NAME..."
mv "$CLONE_DIR" "$NEW_PROJECT_NAME"

cd "$NEW_PROJECT_NAME"

echo "Deleting the script file..."
rm mern_template.sh

# Remove the .git directory
echo "Deleting the .git directory..."
rm -rf .git

echo "Deleting the README.md file..."
rm README.md

if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Please install npm and try again."
    exit 1
fi

echo "npm found. Installing dependencies..."

if [ -d "frontend" ]; then
    echo "Entering frontend folder..."
    cd frontend

    # Run npm install
    echo "Running npm install..."
    npm install

    echo "npm install completed."

    echo "Navigating back to the parent directory..."
    cd ..

else
    echo "Frontend folder not found."
    exit 1
fi

if [ -d "backend" ]; then
    echo "Entering backend folder..."
    cd backend

    # Run npm install
    echo "Running npm install in backend..."
    npm install

    echo "npm install completed in backend."

    # Navigate back to the parent directory
    echo "Navigating back to the parent directory..."
    cd ..
else
    echo "Backend folder not found."
    exit 1
fi

if command -v code &> /dev/null; then
    echo "VS Code found. Opening the current directory in VS Code..."
    code .
else
    echo "VS Code is not installed. Skipping opening the directory."
fi

echo "Setup completed successfully."


