FROM ubuntu:19.10

RUN apt-get update

RUN useradd -d /home/saif -m -p saif -s /bin/bash saif
RUN echo "saif:saif" | chpasswd

WORKDIR /home/saif

C