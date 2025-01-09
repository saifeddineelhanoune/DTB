FROM debian:buster

RUN apt update && apt upgrade && apt install openssl \
                        nginx \
                        python3 \
                        curl \
                        vim \
                        sudo

RUN rm -f /etc/nginx/nginx.conf

COPY ./conf/nginx.conf /etc/nginx/nginx.conf

COPY ./scripts/setup.py /setup.py

RUN chmod -R +x /setup.py

EXPOSE 433

ENTRYPOINT [ "python3", "setup.py" ]
