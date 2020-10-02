# parcel build src/index.html
FROM r.lvk.sh/novalucem/alpine

WORKDIR /app

COPY ./tsconfig.json .
COPY ./package.json .

RUN yarn install --production

COPY ./packages/cloud/package.json ./packages/cloud/package.json

RUN cd /app/packages/cloud && yarn

COPY ./packages/common ./packages/common
COPY ./packages/cloud ./packages/cloud

WORKDIR /app/packages/cloud

CMD ["yarn", "start"]