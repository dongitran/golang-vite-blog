FROM golang:1.19-alpine as builder
WORKDIR /app
COPY . .
RUN rm -rf .env .github .git
RUN go build -o main .

CMD ["./main"]
