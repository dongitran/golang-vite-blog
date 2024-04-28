docker build -t golang-vite-blog-backend .
docker run -v .env:/app/.env golang-vite-blog-backend
