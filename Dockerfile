FROM node:8-slim
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn
COPY . .
CMD ["yarn", "start"] 
