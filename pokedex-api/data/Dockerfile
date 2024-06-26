# Utiliza la imagen oficial de PostgreSQL como base
FROM postgres:latest

# Copia el archivo SQL al contenedor
COPY pokedex.sql /docker-entrypoint-initdb.d/pokedex.sql

# Configura PostgreSQL para aceptar conexiones externas
RUN echo "host all all 0.0.0.0/0 trust" >> /etc/postgresql/postgresql.conf
RUN echo "host all all 0.0.0.0/0 trust" >> /etc/postgresql/pg_hba.conf

# Exponer el puerto de PostgreSQL
EXPOSE 5432