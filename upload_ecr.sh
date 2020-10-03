$(aws ecr get-login --no-include-email --region us-east-1)

docker build -t yup/frontend .

docker tag yup/frontend:latest 097735146604.dkr.ecr.us-east-1.amazonaws.com/yup/frontend:latest

docker push 097735146604.dkr.ecr.us-east-1.amazonaws.com/yup/frontend:latest
