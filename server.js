const express = require('express');
const path = require('path')
const app = express();
app.use(express.static('.'));

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
app.get('/img/:name/:extent',async(req, res)=>{
    res.sendFile(path.join(__dirname + '/assets/'+req.params.name+'.'+req.params.extent))
}) 
app.get('/styleSheet/:name', async(req, res)=>{
    res.sendFile(path.join(__dirname + '/styles/'+req.params.name+'.css'))
})
app.listen(80, () => console.log('Running on port 80'));
