FROM r.lvk.sh/novalucem/alpine

RUN set -eux \
    & apk add \
        --no-cache \
        curl

WORKDIR /app

COPY ./tsconfig.json .
COPY ./package.json .

COPY ./packages/common ./packages/common

RUN yarn install --production

COPY ./packages/backend/package.json ./packages/backend/package.json

RUN cd /app/packages/backend && yarn

COPY ./packages/backend ./packages/backend

WORKDIR /app/packages/backend

CMD ["yarn", "start"]