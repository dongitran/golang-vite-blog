docker build -t golang-vite-blog-frontend .
docker run -v .env:/app/.env golang-vite-blog-frontend
