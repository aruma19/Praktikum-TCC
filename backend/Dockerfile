FROM node:20-alpine 
WORKDIR /app 
COPY . . 
RUN cat .env
RUN npm install --production
EXPOSE 5002
CMD ["node", "index.js"] 