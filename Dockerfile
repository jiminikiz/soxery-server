FROM ubuntu:latest

EXPOSE 80

WORKDIR /app

# Update OS dependencies (cache layer)
RUN apt-get update && apt upgrade -y \
    software-properties-common

# Install npm & sox [+ dependencies] (cache layer)
RUN apt-get install npm sox curl python3-pip libsox-fmt-mp3 ffmpeg -y

# Install ytdl (cache layer)
RUN pip install youtube-dl

# Install node
RUN npm i -g n && n stable && hash -r

# Enable yarn (cache layer)
RUN corepack enable

# COPY source files
COPY . .

# Install App Dependencies
RUN yarn

CMD [ "yarn", "start" ]