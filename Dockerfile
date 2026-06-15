FROM oven/bun:1 AS base
WORKDIR /app
ARG API_URL


FROM base AS builder
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --ignore-scripts
COPY . .
RUN bun --bun run build


FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder --chown=bun:bun /app/.output .
USER bun
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD [ "bun", "--bun", "./server/index.mjs" ]
