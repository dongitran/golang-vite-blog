go build -o main .

kubectl create configmap database-change-monitoring-env --from-env-file=.env --namespace=database-change-monitoring
kubectl delete configmap -n=database-change-monitoring database-change-monitoring-env

docker build -t database-change-monitoring .
docker run -v .env:/app/.env database-change-monitoring
