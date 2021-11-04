const express = require('express');
const path = require('path')
const crypto = require('crypto')
const { Deta } = require('deta');
const user = require('usermanagement')
const app = express();
const deta = Deta('b0bj02xu_yJxh7WpXiJEcGiZkc2GZtW4aJ59UcMs8');
const productDatabase = deta.Base("Products")
app.use(express.static('.'));
app.use(cookieParser())
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
app.post('/add-item-to-cart/:userId', async (req, res) => {

})
app.post('/new-user', async (req, res) => { //Must be carrying an Email, Address(JSON), a Name, and Valid Password. Header Must Include the Correct Auth Key
    if (req.body.auth == authKey&&res.body.email != null&&res.body.address != null&&res.body.name != null&&res.body.password != null){
        res.status(201)
        
    }else if(req.body.auth != authKey){
        res.status(401)
        res.send("Incorrect Authentication Key")
    }else{
        res.status(400)
        res.send("Must have all variables")
    }
})