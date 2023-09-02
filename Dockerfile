FROM 666398651410.dkr.ecr.eu-west-1.amazonaws.com/ecrsource:latest

ARG $DOCKER_BUCKET_NAME

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
