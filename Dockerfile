FROM node:latest
ADD lib /opt/icloud-api
ADD package.json /opt/icloud-api
WORKDIR /opt/icloud-api
RUN npm install --production
CMD ["node", "index.js"]
