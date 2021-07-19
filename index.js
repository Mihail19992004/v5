const express = require('express')
const mongoose =require('mongoose')
const User = require('./models/UserModel.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const News = require('./models/NewsModel.js')
const app = express()

app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.text({ type: 'text/xml' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.text({type: 'text/xml'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
async function start() {
        try {
           await mongoose.connect("mongodb+srv://User:User@cluster0.nska2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
            app.listen(4000, ()=> console.log('aaaa'))

        } catch (e) {
            console.log(e)
        }
}
app.post("/post", async (req,res)=> {
    res.setHeader('Content-Type', 'text/plain')
    const {name, email} = JSON.parse(Object.keys(req.body)[0])
    const user = new User({
        name, email
    })
    await user.save()
    await res.json({message: 'ok'})
})
app.get('/post', async (req,res)=> {
    const links = await User.find()
    console.log(links)
    await  res.json({"test": {
        links
        }})
})
app.post("/news", async (req,res)=> {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    const {title, description, img} = JSON.parse(Object.keys(req.body)[0])
    const news = new News({
        title, description, img
    })
    if(typeof title === 'string'&& typeof description === 'string'&& typeof img === 'string') {
        await news.save()
        await res.json({message: 'ok'})
    } else {res.json({message: 'ne ok'})}

})
app.get('/news', async (req,res)=> {
    const links = await News.find()

    await  res.json({"test": {
            links
        }})
})



start()