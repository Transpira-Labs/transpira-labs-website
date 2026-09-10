# The marketing site (www.transpiralabs.com) as a Cloud Run container.
#
# TanStack Start builds through Nitro. DOCKER_BUILD switches vite.config.ts to
# the node-server preset, which emits a self-contained server at
# .output/server/index.mjs - the Vercel preset emits a Build Output API tree
# that nothing outside Vercel can run.
#
# Installed with bun, not npm: bun.lock is the lockfile this repo maintains and
# the committed package-lock.json has drifted out of sync with package.json, so
# `npm ci` refuses it. Vercel installs with bun here too, which keeps the
# container and the rollback target building from the same dependency set.

FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
ENV DOCKER_BUILD=1
RUN bun run build

# Nitro's node-server output is plain Node, so the runtime image does not need
# bun - only the bundle and a Node runtime.
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN groupadd -r nodejs && useradd -r -g nodejs -m nodeuser

# The node-server preset bundles its dependencies into .output, so nothing
# from node_modules has to come along.
COPY --from=builder --chown=nodeuser:nodejs /app/.output ./.output

USER nodeuser
ENV PORT=8080 HOST=0.0.0.0
EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
