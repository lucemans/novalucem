FROM r.lvk.sh/novalucem/alpine

WORKDIR /app

COPY ./tsconfig.json .
COPY ./package.json .

COPY ./packages/common ./packages/common

RUN yarn install --production

COPY ./packages/auth/package.json ./packages/auth/package.json

RUN cd /app/packages/auth && yarn

COPY ./packages/auth ./packages/auth

WORKDIR /app/packages/auth

CMD ["yarn", "start"]