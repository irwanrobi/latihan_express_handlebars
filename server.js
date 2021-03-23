const express = require("express") // memanggil modul express
const cors = require("cors") // memanggil modul cors
const hbs = require("express-handlebars")  // memanggil modul express-handlebars
const path = require("path") // memanggil modul path

const app = express() // membuat inisial untuk mempersingkat express() menjadi app

// MIDDLEWARE
// untuk memfilter request dan response antara user dan server
app.use(cors()) // memanggil cors dari modul express
app.use(express.json()) // memanggil class atau function json dari module express di dalam folder express
app.use(express.static(path.join(__dirname , "public"))) // memanggil class atau function static dari module express di dalam folder express, kemudian dynamic folder yang dituju
app.use(express.urlencoded())

// setup template engine
app.set("views", path.join(__dirname , "view")) // membuat views di folder view
app.set("view engine", "handlebars")
app.engine("handlebars", hbs({
    layoutsDir :path.join(__dirname, "view/layouts"),
    partialsDir : path.join(__dirname, "view/components"),
    defaultLayout : "main_layout.handlebars"
}))

//  routing
app.get("/", (req, res) => {
    // res.send('kamu request ke server kami...')
    res.render('index', {
        title : "Home Page"
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title : "About"
    })
})

app.get("/contact", (req, res) => {
    res.render('contact', {
        title : "Contact"
    })
})

app.get("/gallery", (req, res) => {
    res.render('gallery', {
        title : "Gallery"
    })
})


// REQUEST PARAMS
app.get("/about/:username/:address", (req, res) => { // operator : untuk penanda param

    // menangkap REQUEST params nya
    const username = req.params.username
    const address = req.params.address

    // mengirim RESPONSE
    res.send(`Selamat datang ${username}! Kamu tinggal di ${address}`)

})

// REQUEST QUERY
http://localhost:3000/contact/detail/?email=.........&phone=.........
app.get("/contact/detail/", (req, res) => {

    const email = req.query.email
    const phone = req.query.phone

    res.send(`
    email: ${email}<br/>
    Phone: ${phone}
    `)
})

// MENGIRIM DATA DENGAN QUERY
app.get("/send", (req, res) => {

    const name = req.query.name
    const phone = req.query.phone
    const email = req.query.email
    const message = req.query.message

    console.log(`
    -------------
    REQUEST QUERY
    -------------
    Nama : ${name}
    Phone : ${phone}
    Email : ${email}
    Message : ${message}
    `)

    res.render('contact', {

        title : "Contact terkirim",
        
        name : name,
        phone : phone,
        email : email,
        message : message
    })
})

// MENGIRIM DATA DENGAN REQUEST BODY
app.post("/message", (req, res) => {

    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email
    const message = req.body.message

    console.log(`
    ------------
    REQUEST BODY
    ------------
    Nama : ${name}
    Phone : ${phone}
    Email : ${email}
    Message : ${message}
    `)

    res.render('contact', {

        title : "Contact terkirim",

        name : name,
        phone : phone,
        email : email,
        message : message
    })
})

// request error handle
app.use((req, res) => {
    res.send('404, halaman tidak ditemukan...')
})

// menjalankan web server
app.listen( 3000, () => {
    console.log('kamu menjalan server di port 3000')
})

