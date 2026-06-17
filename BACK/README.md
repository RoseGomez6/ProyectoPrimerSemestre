Revista Digital — Back End

API REST desarrollada con Node.js y Express para gestionar los artículos de la revista digital.

Instalación
npm install
Configuración

Copiar el archivo .env.example a .env y completar los valores necesarios:

cp .env.example .env
Ejecutar el servidor
npm run dev

El servidor se ejecutará por defecto en:

http://localhost:3000
Rutas disponibles
Método	Ruta	Descripción
GET	/articulos	Devuelve todos los artículos
GET	/articulos/	Devuelve un artículo por ID
POST	/articulos	Crea un artículo nuevo