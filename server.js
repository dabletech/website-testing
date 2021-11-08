const express = require('express');
const rateLimit = require('express-rate-limit')
const path = require('path')
const forge = require('node-forge')
const { Deta } = require('deta');
const user = require('@dable/usermanagement');

const app = express();
const deta = Deta('b0bj02xu_yJxh7WpXiJEcGiZkc2GZtW4aJ59UcMs8');
const productDatabase = deta.Base("Products")


app.use(express.static('.'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));
const limit = rateLimit({
    max: 1,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour
    message: 'Too many requests' // message to send
});

app.use('/new-user', limit);

var port = process.env.PORT || 3000;
app.listen(port);

//Keys
const authKey = "unOYa%faNJ1v_4M#tY*A=lMQZM8gWlX5N#tMUPohAO0g1kYzj*rY7c25gVPpXo%5n0y|0Mwlo|X#=Yr??d-Zv+%sB@OPO_2HLkmjLanZ2L&P7BVY4_2N4+j4E9P#pzxMB?kuiFS7@CSldYRrk?djKcRqD1Et67&-v7PKea9yTom7h&M-+iGy=9Wi0hsx8pG6Ib@52!YtGqgpOtKwA=Dvd8KNj#zej&PG=mpmdZ87d@50_KcoOg8FEWD_pc-G4fek"
const publicAuthKey = "?b5X-+#D|Kfq^LZk"

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
app.get('/sign-up', async (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/signup.html'))
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
    res.sendFile(path.join(__dirname + '/security/authKey.js'))
})

app.post('/add-item-to-cart/:userId', async (req, res) => {

})

app.post('/new-user', async (req, res) => { //Must be carrying an Email, Address(JSON), a Name, and Valid Password. Header Must Include the Correct Auth Key
    var body = req.body
    console.log(body)
    console.log(req.headers.key)
    var authKeyFromClient = forge.util.decode64(req.headers.key)
    console.log(authKeyFromClient)
    try{
        if (authKeyFromClient == authKey&&body.email != null&&body.name != null&&body.password != null&&body.phone!=null){
            await user.newUser(body.email, body.phone, body.name, forge.util.decode64(body.password))
            res.status(201)
            res.send("Created")
        }else if(req.headers.key != authKey){
            console.log("Wrong Key")
            res.status(401)
            res.send("Incorrect Authentication Key")
        }else{
            res.status(400)
            res.send("Must have all variables")
        }
    }catch(err){
        console.log(err)
    }
})