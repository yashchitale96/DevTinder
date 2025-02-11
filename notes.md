- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- install express
- create a server
- listen to port 7777
- make request handlers for /test, /hello
- install nodemon and update scripts inside package.json
- what are dependencies
- what is the use of '-g' while npm install
- difference between carot and tilde (^ vs ~)


- Initialize git 
- .gitignore -> node_modules
- create a remote repo on github
- push all code to remote origin
- ordering is very important for rounting
- /hello /hello2 / /test123 /test like it change the order and understand the importance of ordering
- install postman app and a make a workspace/collection -> test a api call
- write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman
- Explore routing and use of ?, +, (), * in routes 
- Use of regex in rotes /a/, /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

- Multiple Route Handlers - Play with code
- next()
- next function and errors along with res.send()
- app.use("/route", rH, [rH2, rH3, rH4, rH5])
- What is middleware 
- How express JS basically handles requests behind the scene
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
- Error Handling app.use("/", (err, req, res, next))

- create a free cluster on mongoDB official website (Mongo atlas)
- Install mongoose library
- connect your application to the database "Conection-url"/devtinder
- Call the connectDB function and connect to database before starting application on 7777
- Create a userSchema & user model
- Create /signup API to add data to database
- Push some documents using api calls from position
- Error Handling using try, catch

- JS object vs JSON
- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from the end user
- User.findOne with duplicate email ids, which object return
- API GET user by email & eed API - GET / feed - get all the users from the database
- Create a delete user API
- Difference between PATCH and PUT

- Explore schematype options from the documentation
- add required, unique, lowercase, min, minLength, trim
- add default
- create a custom validation for gender
- improve the DB schema - PUT all appropriate validation in each field in schema
- Add timestamps to the userSchema
- Add API level validation on Patch request & SignUp post api
- Data Sanitizing - Add API validation for each field
- Install validator
- Explore the validator library functions and use validator functions for passwrod, email, photourl

- Validate data in SignUp API
- Install Bcrypt package
- Create a password hash using bcrypt.hash & save the user with encrypted password
-Create Login API 
- Compare password and throw errors if email or password is invalid

- Install cookie-parser
- just send a dummy cookie to user
- create GET /profile API and check if you get the cookie back
- install jsonwebtoken
- In login API, after email and password validation, create a JWT token and send it to user in cookies
- read the cookies inside your profile api and find the logged in user
-userAuth middleware
- add the userAuth middleware in profile api and a new sendConnection API
- Set the expiry of JWT token and cookies to 7 days