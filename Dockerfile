FROM ubuntu:18.04

# Basic packages
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    vim \
    emacs \
    locales \
    build-essential
    
# Install Node.js, npm, Python, and Postgres
RUN apt-get update && \
    apt-get install -y nodejs npm python3 python3-pip postgresql postgresql-contrib && \
    npm install -g n && n stable && \
    apt-get purge -y nodejs npm && \
    apt-get clean

RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Los_Angeles
RUN apt-get install -y tzdata

RUN apt-get install -y mongodb-org

ADD init.d-mongod /etc/init.d/mongod
RUN chmod u+x /etc/init.d/mongod

# Node JS
RUN curl -sl https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh

RUN apt-get update && apt-get install -y nodejs

# Install redis server and the redis client
RUN apt-get -y install redis-server

RUN sed -i "s/bind .*/bind 127.0.0.1/g" /etc/redis/redis.conf

RUN mkdir /tmp/node_packages
# COPY package.json /tmp/node_packages/package.json
RUN cd /tmp/node_packages && npm install

# Create test user
RUN useradd -M correction_tester

# Keep the container running indef 
CMD ["tail", "-f", "/dev/null"]






