# Imagen base oficial de Node.js
FROM node:20-alpine

# Crear directorio de la app
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --production

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 8080

# Comando para arrancar la aplicación
CMD ["node", "aplicación.js"]
