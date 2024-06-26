### Run Dockerfile on the data folder
````
docker build -t pokedex-pgsql .
````

### Run the container created by the image and add the env variables.
````
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=secretpassword -e POSTGRES_DB=MyPokemons --name pokedex-db pokedex-pgsql
````

### Create a connection with the PostgreSql Database using your favorite DB Client and use the configurations:
````
host: localhost
database: <no default database selected>
user: postgres
password: secretpassword
````
