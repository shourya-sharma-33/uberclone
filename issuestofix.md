there are some issues to debug ill do tommorow,

now i will just code the rest of comtrollers, and will test out every controller cuz i cant fucking take ts

there is some issue in cookies, token is forming but and probably is being saved but i can do captain/profile or user/profile
cuz there is some issue in token, there is some issue in blacklist as well so what i will do i will debug all of this shit, rn its best i complete this shit asap


thast it
i will, run and console log shit and see whats up, in each controller for  user and captain

-- first we will test /users route

middlware:

authUser:
take token either from req.cookies.token or req.header.authorization

if no token then return

check if token is in blacklisted

if is in blacklisted then return

try to deccode toen and find user by id
and take user from req.user

or catch error

captainUser :

token from req.cookies or headers

if no token then return

is blacklsited, find from document of that token

if blacklisted then send unauthrized

now try to decode, verify and find by id
and then next

=====================================

user

methods

generate auth token to generate token
compare pasword to bcrypt compare
hash passwrd to hash
=====================================

app.js/19 initialising route


/register is a post methord
check if inputs are actually following the schema and then run userContrioller.registerUser

first we will use Validatioon result from express validator to check errors and print


if error list isnt empty then there is issue we will RETURN

now we will see if user already exists by finding it out from database

if user already exist we will RETURN

now we will hash the password (hashing in user.routes.js)

now we will create a user using the createUser Service

now we will generate auth token, token jwt.sign({_id : this.id}) we will sign

responce with token and user
-------------------------

/login is a post methord
check if inputs are actually following the schema and then run userContrioller.loginUser

store error in error and return if errors list isnt empty

email and password, take them from reques body

find a user, and store with PASSWORD

and if there is no user RETURN

now match password, comparePassword method in user

generate token by generate auth token method in user

store it in res.cookie

and send token and user in json

--------------------------

/profile will get profile, and after hitting route, authMiddleware.authUser middleware will run and then userController.getUserProfile will run

(middlewares explained on top)

simply return user in res


--------------------------

/logout will log out, and after hitting route, authMiddleware.authUser middleware will run and then userController.logoutUser will run

(middlewares explained on top)

extract token, store in blacklistedtokenmodel, so we cant reuse

and now log out

=======================================

captain

methods

generate auth token to generate token
compare pasword to bcrypt compare
hash passwrd to hash

20 app.js initialisation

=======================================

/register is a post methord
check if inputs are actually following the schema and then run captainContrioller.registerCaptain

register captain controller :

store errors in error array and if it isnt empty then return

then store fullname email password vehicle from req.body

if captain already exists then return

and hashpassword and store in hashpassword

and use create captain in database

and generate token

and in responce send token captain



---------------------------------------
/login is a post methord
check if inputs are actually following the schema and then run captainContrioller.loginCaptain

in login captain controller :

store errors in error array and if array isnt empty than return

take email and password from req.body

and then find captain model documen with this email with password

and if no captain then return

and then match password

if password didnt match then return

generate token 

send token and captain document in res


---------------------------------------

/profile is a get method and run authmiddleware.authcaptain to authenticate the captain (middleware covered on top) and then captainController.getCaptainProfile

after running the middleware, jus send req.captain as res

----------------------------------------

/logout get method
run authmiddleware.authCaptain
(middleware on top)

run captainController.logoutCaptain

logoutCaptain controller :

store token in tokens
and create a document in blacklistTokenModel

clear token

and responce message
