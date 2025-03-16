# Imagen base oficial de Node.js
FROM node:20-alpine

# Crear el directorio de la app
WORKDIR /usr/src/app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del código
COPY . .

# Exponer el puerto de la app
EXPOSE 8080

# Comando de arranque
CMD ["node", "aplicación.js"]
