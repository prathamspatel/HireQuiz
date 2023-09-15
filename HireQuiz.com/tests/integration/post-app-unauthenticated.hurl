# Unauthenticated POST to /v1/application
POST http://localhost:8080/v1/application
Content-Type: application/json

{
  "text": "This is a application!"
}

HTTP/1.1 401
[Asserts]
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 401
jsonpath "$.error.message" == "Unauthorized"
