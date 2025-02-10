FROM node:21.6.2-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl
RUN pnpm install
RUN pnpm run prisma:generate
RUN pnpm run build
EXPOSE 3000
CMD [ "pnpm", "start" ]