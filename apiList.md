# Devtinder APIs

# AuthRouter
- POST /signup
- POST /login
- POST /logout

# ProfileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# ConnectionRequestRouter
- POST /request/send/:status/:userId (status => interested, rejected)

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

# userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profiles of users on platform

Status : ignore, interested, accepted, rejected
