FROM mysql:8.0

COPY init.sql /docker-entrypoint-initdb.d/

RUN chown -R mysql:mysql /docker-entrypoint-initdb.d/

CMD ["mysqld"]