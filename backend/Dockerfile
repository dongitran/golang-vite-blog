FROM golang:1.19-alpine
WORKDIR /app
COPY . .
RUN rm -rf .env .github .git
RUN go build -o main .

CMD ["/bin/sh", "-c", ". /vault/secrets/env-config && ./main"]