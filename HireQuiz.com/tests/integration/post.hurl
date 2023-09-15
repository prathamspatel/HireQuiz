# tests/integration/post.hurl
# Authenticated POST to /v1/posting
POST http://localhost:8080/v1/posting
# We're sending a json posting
Content-Type: application/json
# Include HTTP Basic Auth credentials
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==
# Body of the request goes in ```...``` when it's a string
```{"data": "This is a post test"}```

# We expect to get back an HTTP 201
HTTP/1.1 201
[Asserts]
header "Location" matches "^http:\/\/localhost:8080\/v1\/posting\/[A-Za-z0-9_-]+$"
jsonpath "$.status" == "ok"
jsonpath "$.posting.id" matches "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
jsonpath "$.posting.ownerId" matches "^[0-9a-fA-F]+$"
jsonpath "$.posting.created" isString
jsonpath "$.posting.updated" isString
jsonpath "$.posting.type" == "application/json"
jsonpath "$.posting.size" == 31


[Captures]
url: header "Location"


GET {{url}}
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==

HTTP/1.1 200
Content-Type: application/octet-stream
Content-Length: 31
[Asserts]
body == ```{"data": "This is a post test"}```
