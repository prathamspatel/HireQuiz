# Unauthenticated POST to /v1/posting
POST http://localhost:8080/v1/posting
Content-Type: application/json

{
  "text": "This is a posting!"
}

HTTP/1.1 401
[Asserts]
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 401
jsonpath "$.error.message" == "Unauthorized"
