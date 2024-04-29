docker build -t golang-vite-blog-frontend .
docker run -v .env:/app/.env golang-vite-blog-frontend

kubectl create configmap golang-vite-blog-frontend-env --from-env-file=.env --namespace=golang-vite-blog
kubectl delete configmap -n=golang-vite-blog golang-vite-blog-frontend-env
