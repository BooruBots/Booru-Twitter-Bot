FROM node:8.12.0
COPY lib lib
COPY index.js index.js
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY config config
RUN npm install --production

FROM node:8.12.0-slim

COPY --from=0 node_modules node_modules
COPY --from=0 lib lib
COPY --from=0 index.js index.js
COPY --from=0 package.json package.json
COPY --from=0 config config

RUN node index.js
