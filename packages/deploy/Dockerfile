FROM r.lvk.sh/novalucem/alpine

RUN set -eux \
    & apk add \
        --no-cache \
        curl

RUN curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
RUN chmod +x ./kubectl && mv ./kubectl /usr/local/bin/kubectl

WORKDIR /app

COPY ./tsconfig.json .
COPY ./package.json .

RUN yarn install --production

COPY ./packages/deploy/package.json ./packages/deploy/package.json

RUN cd /app/packages/deploy && yarn

COPY ./packages/common ./packages/common
COPY ./packages/deploy ./packages/deploy

WORKDIR /app/packages/deploy

CMD ["yarn", "start"]