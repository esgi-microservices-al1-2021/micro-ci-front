#### Angular Build Image
FROM node:14-alpine as builder

COPY package.json package-lock.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm ci && mkdir /micro-ci-front && cp -R ./node_modules ./micro-ci-front

WORKDIR /micro-ci-front

COPY . .

RUN npm run production



#### Nginx Image containing the compiled Angular application
FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/

## Copy Nginx config files
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/micro-ci /etc/nginx/micro-ci/

## Copy Angular application
COPY --from=builder /micro-ci-front/dist/micro-ci-front /usr/share/nginx/html

## Rights for nginx linux user
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/
RUN chown -R nginx:nginx /etc/nginx/
RUN chown -R nginx:nginx /var/log/nginx/
RUN chown -R nginx:nginx /var/cache/nginx/
RUN chmod -R 755 /var/run/
RUN chmod -R 755 /etc/nginx/
RUN chmod -R 755 /var/log/nginx/
RUN chmod -R 755 /var/cache/nginx/

USER nginx

## Execute template vars replacement & start nginx with generated configuration file
CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/micro-ci/micro-ci-front.conf.template > /etc/nginx/micro-ci/micro-ci-front.conf" && nginx -g 'daemon off;'
