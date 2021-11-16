const express = require('express');
const rateLimit = require('express-rate-limit')
const path = require('path')
const forge = require('node-forge')
const crypto = require("crypto");
const { Deta } = require('deta');
const cookie = require('cookie')
const user = require('@dable/usermanagement');

const app = express();
const deta = Deta('b0bj02xu_yJxh7WpXiJEcGiZkc2GZtW4aJ59UcMs8');
const productDatabase = deta.Base("Products")


app.use(express.static('.'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));

var port = process.env.PORT || 3000;
app.listen(port);

//Keys
const authKey = "unOYa%faNJ1v_4M#tY*A=lMQZM8gWlX5N#tMUPohAO0g1kYzj*rY7c25gVPpXo%5n0y|0Mwlo|X#=Yr??d-Zv+%sB@OPO_2HLkmjLanZ2L&P7BVY4_2N4+j4E9P#pzxMB?kuiFS7@CSldYRrk?djKcRqD1Et67&-v7PKea9yTom7h&M-+iGy=9Wi0hsx8pG6Ib@52!YtGqgpOtKwA=Dvd8KNj#zej&PG=mpmdZ87d@50_KcoOg8FEWD_pc-G4fek"

app.get('/status', async (req, res) => {
    res.status(200)
    res.send("All Good!")
})
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})
app.get('/home', async (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})
app.get('/signup', async (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/signup.html'))
})
app.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/login.html'))
})
app.get('/about-us', async (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/aboutus.html'))
})
app.get('/learn-more', async (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/learnmore.html'))
})
app.get('/checkout', async (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/checkout.html'))
})
app.get('/img/:name/:extent', async (req, res) => {
    res.sendFile(path.join(__dirname + '/assets/' + req.params.name + '.' + req.params.extent))
})
app.get('/styleSheet/:name', async (req, res) => {
    res.sendFile(path.join(__dirname + '/styles/' + req.params.name + '.css'))
})
app.get('/auth', async (req, res) => {
    var auth = crypto.randomBytes(36).toString('hex');
    res.send({"AuthKey": auth })
})

app.post('/add-item-to-cart/:userId', async (req, res) => {

})

app.post('/new-user', async (req, res) => { //Must be carrying an Email, Address(JSON), a Name, and Valid Password. Header Must Include the Correct Auth Key
    var body = req.body
    var authKeyFromClient = req.headers.key
    try {
        if (authKeyFromClient == authKey && body.email != null && body.name != null && body.password != null && body.phone != null) {
            pass = forge.md.sha512.create()
            pass.update(forge.util.decode64(body.password))
            var newUser = await user.newUser(body.email, body.phone, body.name, pass.digest().toHex())
            console.log(newUser.created)
            if (newUser.created == true) {
                res.status(201)
                res.setHeader("Set-Cookie", cookie.serialize('UserAuthKey', newUser.userSpecificAuthKey),{
                    httpOnly: true,
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                    secure: process.env.NODE_ENV !== "development",
                })
                res.send("Created")
            } else {
                res.status(455).send("User already Created")
            }
        } else if (req.headers.key != authKey) {
            console.log("Wrong Key")
            res.status(401)
            res.send("Incorrect Authentication Key")
        } else {
            res.status(400)
            res.send("Must have all variables")
        }
    } catch (err) {
        console.log(err)
    }
})
app.post('/loginUser', async (req, res) => {
    var body = req.body
    var authKeyFromClient = req.headers.key
    try {
        if (authKeyFromClient == authKey && body.email != null && body.password != null) {
            pass = forge.md.sha512.create()
            pass.update(forge.util.decode64(body.password))
            var signUser = await user.logUserIn(body.email, pass.digest().toHex())
            if (signUser.signin == true) {
                console.log()
                res.status(200)
                res.setHeader("Set-Cookie", cookie.serialize('UserAuthKey', signUser.userSpecificAuthKey),{
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
                res.send("Logged In")
            } else {
                res.status(454)
                res.send("Incorrect Password/Email")
            }
        } else {

            res.status(400)
            res.send("Must have all variables")
        }
    } catch (error) {
        console.log(error)
    }
})