#!/bin/bash

# Configuración por defecto
export NODE_ENV=production
export PORT=8080
export DB_NAME=todoapp
export DB_USER=root
export DB_PASSWORD=password
export DB_HOST=localhost
export DB_PORT=3306

echo "Iniciando aplicación ToDo API en modo $NODE_ENV..."
echo "Conectando a MySQL en $DB_HOST:$DB_PORT con usuario $DB_USER"

# Ejecuta la aplicación
node app.js
