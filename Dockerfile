FROM node:18

WORKDIR /app

COPY build/ ./

CMD ["node", "src/index.js"]
