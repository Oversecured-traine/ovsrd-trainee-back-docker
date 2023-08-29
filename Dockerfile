FROM 666398651410.dkr.ecr.eu-west-1.amazonaws.com/ecrsource:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]