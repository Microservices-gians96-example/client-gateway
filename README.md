## Client Gateway

El gateway cliente es el encargado de comunicarse con el backend y recibir los datos que se le envían.

## Dev

1. Clonar el repositorio
2. Instalar dependencias

```bash
npm install
```

3. Crear un archivo de variables de entorno `.env` basado en el archivo `.env.template`
4. Levantar el servidor de Nats
```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```
5. Tener el backend corriendo o microservicios
6. Ejecutar el gateway cliente
```bash
npm run start:dev
```

## Nats

```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```