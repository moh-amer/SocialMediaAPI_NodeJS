FROM node:latest

WORKDIR /root/node_smart/social_media
RUN npm i -g nodemon

CMD ["nodemon","index.js"]
