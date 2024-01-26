1. Add/Create a User

curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name":"John Doe"}'

2. Create a Post

curl -X POST http://localhost:3000/posts \
-H "Content-Type: application/json" \
-d '{"userId":1, "title":"My First Post", "content":"This is the content of my first post"}'

3. Create a Comment

curl -X POST http://localhost:3000/comments \
-H "Content-Type: application/json" \
-d '{"postId":1, "userId":1, "content":"This is a comment on the first post"}'

4. Get Feed (Sorted List of Posts by Most Recent)

curl -X GET http://localhost:3000/feed

5. Get a Post and Its Comments

curl -X GET http://localhost:3000/posts/1
