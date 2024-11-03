FROM node:22 AS builder

RUN npm i -g corepack && corepack enable

WORKDIR /build

COPY ./package.json .
COPY ./package-lock.json .

RUN npm i

COPY . ./

RUN npm run build

FROM ghcr.io/thedevminertv/gostatic:latest

CMD [ "-spa" ]

COPY --from=builder /build/build /static
