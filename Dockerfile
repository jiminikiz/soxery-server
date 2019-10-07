FROM ubuntu:latest

EXPOSE 80

WORKDIR /app

# Update OS dependencies (cache layer)
RUN apt update && apt upgrade -y
# Install SOX + NPM (cache layer)
RUN apt install npm curl python-pip sox -y
# Install ytdl (cache layer)
RUN pip install youtube-dl
# Install Node + Yarn (cache layer)
RUN npm i -g n && \
    n latest && \
    npm i -g yarn

# Install ytdl && sox dependencies
RUN apt install libsox-fmt-mp3 ffmpeg -y

# COPY source files
COPY . .

# Install App Dependencies
RUN yarn

CMD [ "yarn", "start" ]