FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000

# Changed this line to run via your package.json script dynamically
CMD ["npm", "run", "start"]