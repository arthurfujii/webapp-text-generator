FROM --platform=linux/amd64 node:19-bullseye-slim@sha256:f58f1fcf5c9ff9e3752993edb4ed6dbd35697124c85a43f3b97aa054500b0534

WORKDIR /app

COPY . .

# NEXT_PUBLIC_* sao embutidos no bundle pelo `next build` (inlining) e chegam
# como build args do compose. O contexto de build nunca carrega .env; os
# valores publicos terminam no bundle do browser de qualquer forma. Os
# segredos (AUTH_*) sao injetados apenas em runtime pelo compose.
ARG NEXT_PUBLIC_APP_ID
ARG NEXT_PUBLIC_APP_KEY
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_TYPE_WORKFLOW
ARG NEXT_PUBLIC_APP_BASE_URL_PATH
ARG NEXT_PUBLIC_API_PREFIX
ENV NEXT_PUBLIC_APP_ID=${NEXT_PUBLIC_APP_ID} \
    NEXT_PUBLIC_APP_KEY=${NEXT_PUBLIC_APP_KEY} \
    NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    NEXT_PUBLIC_APP_TYPE_WORKFLOW=${NEXT_PUBLIC_APP_TYPE_WORKFLOW} \
    NEXT_PUBLIC_APP_BASE_URL_PATH=${NEXT_PUBLIC_APP_BASE_URL_PATH} \
    NEXT_PUBLIC_API_PREFIX=${NEXT_PUBLIC_API_PREFIX}

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn","start"]
