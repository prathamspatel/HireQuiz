echo "Setting AWS environment variables for LocalStack"

echo "AWS_ACCESS_KEY_ID=test"
export AWS_ACCESS_KEY_ID=test

echo "AWS_SECRET_ACCESS_KEY=test"
export AWS_SECRET_ACCESS_KEY=test

echo "AWS_SESSION_TOKEN=test"
export AWS_SESSION_TOKEN=test

export AWS_DEFAULT_REGION=us-east-1
echo "AWS_DEFAULT_REGION=us-east-1"

echo 'Waiting for LocalStack S3...'
until (curl --silent http://localhost:4566/health | grep "\"s3\": \"\(running\|available\)\"" > /dev/null); do
    sleep 5
done
echo 'LocalStack S3 Ready'

echo "Creating LocalStack S3 bucket: hirequiz"
aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket hirequiz

echo "Creating DynamoDB-Local DynamoDB table: hirequiz"
aws --endpoint-url=http://localhost:8000 \
dynamodb create-table \
    --table-name hirequiz \
    --attribute-definitions \
        AttributeName=ownerId,AttributeType=S \
        AttributeName=id,AttributeType=S \
    --key-schema \
        AttributeName=ownerId,KeyType=HASH \
        AttributeName=id,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=10,WriteCapacityUnits=5

aws --endpoint-url=http://localhost:8000 dynamodb wait table-exists --table-name hirequiz
