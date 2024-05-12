FROM golang:1.19
WORKDIR /app
COPY . .
RUN rm -rf .env .github .git
RUN go build -o main .

ENTRYPOINT ["/bin/bash", "-c"]
CMD ["source /vault/secrets/env-config && ./main"]
