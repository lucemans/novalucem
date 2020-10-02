FROM r.lvk.sh/novalucem/alpine

WORKDIR /app

COPY ./tsconfig.json .
COPY ./package.json .

RUN yarn install --production

COPY ./packages/auth/package.json ./packages/auth/package.json

RUN cd /app/packages/auth && yarn

COPY ./packages/common ./packages/common
COPY ./packages/auth ./packages/auth

WORKDIR /app/packages/auth

CMD ["yarn", "start"]