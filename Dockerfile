FROM node:18
WORKDIR /app
COPY . /app
RUN npm ci
EXPOSE 8080
CMD sh -c "node deploy-commands.js && node index.js"
