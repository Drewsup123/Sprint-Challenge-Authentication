<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
Sessions are a simple way to store data wihin the memory cache. The data can persist throughout multiple requests.

2. What does bcrypt do to help us store passwords in a secure manner.
It hashes the password a certain number of times before it is inserted to the database so we never have a plain text version of it.

3. What does bcrypt do to slow down attackers?
Since it takes time to hash a password it would slow attackers down because they would have short pauses every iteration they would go through.

4. What are the three parts of the JSON Web Token?
1 Header
2 Payload
3 Signature
