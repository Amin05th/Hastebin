const mongoose = require("mongoose")
const express = require("express")
const Document = require('./Mongoose/Document')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static(__dirname +  "/public"))

app.use(express.urlencoded({ extended:true }))
mongoose.connect("mongodb://localhost/hastebin", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

app.get('/', (req, res) => {
    const code = `Welcome to Hastebin!
    
    
use the right top corner
for saving creating and sharing files`
    res.render('existingDocument.ejs', { code, language:'language-plaintext' })
})

app.get('/new', (req, res) => {
    res.render('newDocument.ejs')
})

app.post('/save', async (req, res) => {
    const value = req.body.value
    try {
        const SaveDocument = await Document.create({ value })
        res.redirect(`/${SaveDocument.id}`)
    }
    catch(e) {
        res.render('newDocument', {value})
    }
})

app.get('/:id/dublicate', async (req, res) => {
    const Querry = req.params.id
    try {
        const User = await Document.findById(Querry)
        res.render('newDocument.ejs', { value: User.value })
    }
    catch {
        res.redirect(`/${Querry}`)
    }
})

app.get('/:id', async (req, res) => {
    const Querry = req.params.id
    try {
        const User = await Document.findById(Querry)
        res.render("existingDocument.ejs", {code: User.value, id: Querry})
    }
    catch {
        res.redirect('/')
    }
})

app.listen(3000)