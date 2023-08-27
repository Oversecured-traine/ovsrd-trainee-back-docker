FROM node:14

WORKDIR /app

COPY build/ ./

CMD ["node", "src/index.js"]
