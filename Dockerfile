FROM node

WORKDIR /usr/app
COPY package.json /usr/app
RUN npm install
COPY . .
RUN npm run build 
CMD npm start
