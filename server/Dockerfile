FROM node:22-slim

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app


COPY server/package*.json ./
RUN npm install


COPY server/ .

RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]