# Use Ubuntu as the base image
FROM ubuntu:latest as base

# Set non-interactive timezone configuration to avoid tzdata prompts
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Los_Angeles

# Basic packages
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    vim \
    emacs \
    locales \
    build-essential \
    tzdata

# Update locale to support UTF-8
RUN locale-gen en_US.UTF-8  
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8

# Install Node.js, npm, Python, and Postgres
RUN apt-get update && \
    apt-get install -y nodejs npm python3 python3-pip postgresql postgresql-contrib && \
    npm install -g n && n stable && \
    apt-get purge -y nodejs npm && \
    apt-get clean

# Install Python packages that I may use for data cleaning and analysis
RUN pip3 install --upgrade pip && \
    pip3 install numpy pandas matplotlib seaborn scikit-learn jupyterlab

# Keep the container running indefinitely
CMD ["tail", "-f", "/dev/null"]

