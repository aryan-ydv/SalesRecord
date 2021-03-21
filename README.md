Steps
1. run npm install in project's terminal 
2. go inside schema/database.sql and copy SQL query and paste inside your database
3. now go inside the DB directory and open config.js and replace it with your PostgreSQL connection details
4. now go into terminal and run node --max_old_space_size=8192 server.js
5. now open postman and select post request and enter URL localhost:3000/uploadcsv and select form-data tab and enter csvfile in key and chose file option and upload the CSV file and click on send button