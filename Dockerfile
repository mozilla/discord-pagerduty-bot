FROM node:18
WORKDIR /app
COPY . /app
RUN npm ci
CMD sh -c "node deploy-commands.js && node index.js"
