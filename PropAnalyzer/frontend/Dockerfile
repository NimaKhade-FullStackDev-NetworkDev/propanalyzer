FROM node:18-alpine

WORKDIR /app

# ابتدا مطمئن شویم ابزارهای لازم نصب هستند
RUN apk update && apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    && ln -sf python3 /usr/bin/python

# کپی فقط package.json اول
COPY package.json package-lock.json* ./

# حل مشکل با رویکردهای مختلف
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 100000 && \
    npm config set fetch-retry-maxtimeout 600000 && \
    npm cache clean --force

# نصب با چندین لایه fallback
RUN npm ci --legacy-peer-deps || \
    npm install --legacy-peer-deps --verbose || \
    npm install --production=false --legacy-peer-deps

# کپی بقیه فایل‌ها
COPY . .

RUN npm run build

CMD ["npm", "start"]
EXPOSE 3000




# چک کنید که package.json معتبر باشد
node -e "require('./package.json')"