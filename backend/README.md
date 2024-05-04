go build -o main .

kubectl create namespace golang-vite-blog
kubectl create configmap golang-vite-blog-backend-env --from-env-file=.env --namespace=golang-vite-blog
kubectl delete configmap -n=golang-vite-blog golang-vite-blog-backend-env

docker build -t golang-vite-blog-backend .
docker run -v .env:/app/.env golang-vite-blog-backend
