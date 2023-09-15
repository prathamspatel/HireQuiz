# Authenticated POST to /v1/postings
POST http://localhost:8080/v1/posting
# user1@email.com:password1
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==
# We're sending a plain text posting
Content-Type: application/json
# Body of the request goes in ```...``` when it's a string
```this is test```

# 1. We expect to get back an HTTP 201
HTTP/1.1 201
# We have various assertions about the response that we want to check 
[Asserts]
# The Location header should look like what we expect (including the posting id)
header "Location" matches "^http:\/\/localhost:8080\/v1\/posting\/[A-Za-z0-9_-]+$"
jsonpath "$.status" == "ok"
# Our posting ids use https://www.npmjs.com/package/nanoid
jsonpath "$.posting.id" matches "^[A-Za-z0-9_-]+$"
# Our ownerId hash is a hex encoded string
jsonpath "$.posting.ownerId" matches "^[0-9a-fA-F]+$"
# Basic check for the presence of created and updated date strings.
# You could also write a regex for this and use matches
jsonpath "$.posting.created" isString
jsonpath "$.posting.updated" isString
jsonpath "$.posting.type" == "application/json"
# check the length of our posting data
jsonpath "$.posting.size" == 12
# Capture the Location URL into a variable named `url`
[Captures]
url: header "Location"

# 2. Try to GET the posting we just posted by its URL
GET {{url}}
Authorization: Basic dXNlcjFAZW1haWwuY29tOnBhc3N3b3JkMQ==

HTTP/1.1 200
Content-Type: application/octet-stream
Content-Length: 12
[Asserts]
body == "this is test"
