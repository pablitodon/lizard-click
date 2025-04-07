FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

# Устанавливаем зависимости (аналог npm ci для Yarn)
# --frozen-lockfile — гарантирует, что версии из yarn.lock не будут обновляться (аналогично npm ci).
RUN yarn install --frozen-lockfile

# Копируем остальные файлы проекта
COPY . .

# Указываем порт 
ENV PORT=3000
EXPOSE ${PORT}

# Запускаем приложение через Yarn
CMD ["yarn", "start"]