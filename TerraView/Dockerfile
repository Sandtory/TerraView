FROM node:erbium

ENV API_KEY_FLICKR XXX

COPY . /TerraView

WORKDIR /TerraView

RUN npm install

EXPOSE 3000

CMD [ "node", "app.js"]