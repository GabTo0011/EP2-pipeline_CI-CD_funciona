FROM mysql:8.0
ENV MYSQL_DATABASE=users_db

# Copia el script de inicialización que crea la tabla y datos base
COPY init.sql /docker-entrypoint-initdb.d/

# Las credenciales deben inyectarse en tiempo de ejecución
# mediante docker-compose, docker run o secretos del orquestador.
EXPOSE 3306