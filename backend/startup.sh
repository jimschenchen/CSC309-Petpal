#!/bin/bash

echo "Installing pip..."
sudo apt update;
sudo apt install python3-pip;
echo "pip installed."

echo "Installing Virtualenv..."
pip install virtualenv > /dev/null;
echo "Virtualenv installed."

echo "Creating virtual environment..."
virtualenv venv > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "First attempt failed, trying with 3.9 Python version..."
    virtualenv -p /usr/bin/python3.9 venv > /dev/null 2>&1

    if [ $? -ne 0 ]; then
        echo "First attempt failed, trying with 3.8 Python version..."
        virtualenv -p /usr/bin/python3.8 venv > /dev/null 2>&1

        if [ $? -ne 0 ]; then
            echo "Failed to create virtual environment with specific Python version."
            exit 1
        fi

    fi
fi
echo "Virtual environment created."

echo "Updating pip..."
venv/bin/python -m pip install --upgrade pip > /dev/null;
echo "Pip updated."

echo "Installing dependencies..."
venv/bin/pip install -r requirements.txt > /dev/null;
echo "Dependencies installed."
venv/bin/pip list;

# migrtation
echo "Migrating..."
venv/bin/python ./manage.py makemigrations
venv/bin/python ./manage.py migrate
echo "Migration Done..."


echo "Startup complete. Please manually run 'source venv/bin/activate' to activate virtual environment.";
