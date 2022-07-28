## RUNNING DEV 
`npx nodemon server.js` - server running
`npx gulp` - styles parsing
`npm run build-js` - js bundling

Important:
DB Queries are ASYNC - ONLY PROPER CODE ALLOWED

V 1.0
Backend settled Controlers + Gateways

Do not send main server file to remote repo.

HOTFIX: 
 - Add ogImg column to pages table

 CREATE TABLE settings (id int PRIMARY KEY AUTO_INCREMENT, name text, val tinyint(1)) 