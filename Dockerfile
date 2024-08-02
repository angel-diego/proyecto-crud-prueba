FROM node:18
WORKDIR /server
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]

# En el archivo server.js en el localhost hay que cambiarlo por el nombre del contenedor que tiene la base de datos.
# Cuando ya creamos la imagen, creamos el contenedor con el siguiente comando:
# docker run -d --name crud -p 3000:3000 --network <nombre-red> <nombre-imagen>
# Acordate de poner el contenedor en la misma red que esta el contenedor de la base de datos.