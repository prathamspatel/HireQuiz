# Health Check Test
GET http://localhost:8080

# We should get back an HTTP 1.1 200 response
HTTP/1.1 200
Cache-Control: no-cache

[Asserts]
jsonpath "$.status" == "ok"
jsonpath "$.author" isString
jsonpath "$.githubUrl" matches /^https:\/\/github.com\/.+/
jsonpath "$.version" matches /^\d+\.\d+\.\d+$/
