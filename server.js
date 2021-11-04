const express = require('express');
const path = require('path')
const {Deta} = require('deta');
const app = express();
const deta = Deta('b0bj02xu_yJxh7WpXiJEcGiZkc2GZtW4aJ59UcMs8');
const productDatabase = deta.Base("Products")
app.use(express.static('.'));
var port = process.env.PORT || 3000;
app.listen(port);
const authKey = ""
const publicAuthKey = "?b5X-+#D|Kfq^LZk"
const YOUR_DOMAIN = 'http://localhost:80';

app.get('/status', async (req, res) => {
    res.status(200)
    res.send("All Good!")
})
app.get('/', async(req, res)=>{
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})
app.get('/home', async(req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})
app.get('/about-us', async(req, res)=>{
    res.sendFile(path.join(__dirname + '/pages/aboutus.html'))
})
app.get('/learn-more', async(req, res)=>{
    res.sendFile(path.join(__dirname + '/pages/learnmore.html'))
})
app.get('/checkout', async(req, res)=>{
    res.sendFile(path.join(__dirname + '/pages/checkout.html'))
})
app.get('/img/:name/:extent',async(req, res)=>{
    res.sendFile(path.join(__dirname + '/assets/'+req.params.name+'.'+req.params.extent))
}) 
app.get('/styleSheet/:name', async(req, res)=>{
    res.sendFile(path.join(__dirname + '/styles/'+req.params.name+'.css'))
})
app.post('/add-item-to-cart/:userId', async(req,res)=>{

})
app.post('/newUser', async(req,res)=>{
    
})