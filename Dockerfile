# Node 22 LTS (bookworm): o sass>=1.98 exige node>=20.19 e o dev local roda
# node 26 + npm. O install usa `npm ci` sobre o package-lock.json (o upstream
# usava `yarn install` sem yarn.lock — resolucao nao deterministica).
FROM --platform=linux/amd64 node:22-bookworm-slim@sha256:de170b39439eb0e5a3444ad7d60b015614a381e10fecae2e30ec9e735122f38d

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

# HUSKY=0: o prepare (`husky install`) nao tem .git no contexto de build
ENV HUSKY=0
RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["npm","start"]
