FROM node:22-alpine3.20 AS base
WORKDIR /app
ARG API_URL


FROM base AS builder
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
ARG SERVER_URL
RUN yarn run build


FROM base AS runner
ENV NODE_ENV production
RUN mkdir .output
RUN chown -R 1000 .output
COPY --from=builder --chown=node:node /app/.output .
USER node
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD [ "node", "./server/index.mjs" ]
