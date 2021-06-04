const express = require('express')
const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt')

const app = express()

app.use(express.json())

// This can be used as middleware on any route that requires an authenticated user to access
const jwtCheck = expressjwt({
    algorithms: ['HS256'],
    secret: 'mysupersecretkey'
})

// An object to act as a fake users database
const users = [
    {id:1, username:"admin",password:"admin"},
    {id:2, username:"guest",password:"guest"}
]

// The login route - this route checks the provided username and password against the fake DB
// Returns an error if the credentials are invalid
// Or a JSON web token if the credentials are valid
app.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.send('get out!')
    }

    // Does the username and password match a user in the fake DB?
    const user = users.find((u) => {
        return u.username === req.body.username && u.password === req.body.password
    })

    // If not, send an error response
    if (!user) {
        res.send('Seriously, get lost')
    }

    // Otherwise issue new token
    const token = jwt.sign({
        sub: user.id,
        username: user.username,
    }, 'mysupersecretkey', {expiresIn: "3 hours"})

    // And send the token back as JSON
    res.json({access_token: token})
})

// A normal public route - accessible by any user
app.get('/resource', (req, res) => {
    res.send('Hello, this is public!')
})


// A private route - notice jwtCheck as the second param
// This registers the jwtCheck as middleware on this route, so only users who provide
// a valid JWT can get access
app.get('/resource/secret', jwtCheck, (req, res) => {
    res.send('Secret!!!')
})


app.listen(5000)