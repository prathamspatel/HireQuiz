# tests/integration/post-postings.hurl
# Authenticated POST json to /v1/postings
POST http://localhost:8080/v1/posting
# user1@email.com:password1
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==
# We're sending json posting
Content-Type: application/json
# Body of the request goes in ```...``` when it's a string
```
{ "service": "DynamoDB" }
```

# 1. We expect to get back an HTTP 201
HTTP/1.1 201
# We have various assertions about the response that we want to check 
[Asserts]
# The Location header should look like what we expect (including the posting id)
header "Location" matches "^http:\/\/localhost:8080\/v1\/posting\/[A-Za-z0-9_-]+$"
# Capture the Location URL into a variable named `url`
[Captures]
posting1_url: header "Location"
posting1_id: jsonpath "$.posting.id"
