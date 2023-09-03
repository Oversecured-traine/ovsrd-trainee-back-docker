# Устанавливаем базовый образ, например, Ubuntu
FROM ubuntu:latest

# Настройка health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=2 \
  CMD curl -f http://localhost/ || exit 1

# Установка curl внутри контейнера (если его нет по умолчанию)
RUN apt-get update && apt-get install -y curl
