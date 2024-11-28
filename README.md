# Getting Started with Create React App

En el directorio del proyecto:

### 1. `npm install`
### 2. `npm start`

### 3. Comprobar que el proyecto de la Api en Laravel este corriendo en alguna de las dos url:
    http://localhost:8000
    http://127.0.0.1:8000
Si en alguno de los link la pagina no carga, es porque el proyecto de Laravel, no esta corriendo adecuadamnete.

Para hacer pruebas de test, es en la rama test, porque en la rama main, depende de la api en laravel, que conecta con una db al hacer la migracion:

### 1. `git checkout test`
### 2. `npm test`