
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

app.use(session({
    secret: 'asdasfdaf236256asda1',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 30000
    }
}));
//const cors = require('cors');
const bodyParser = require('body-parser').urlencoded({
    extended: false
});
app.get('/',(req, res) => {
    res.render('index')
})

// app config
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(bodyParser);

process.on('warning', warning => {
    console.log(warning.stack);
})

const postRouter = require('./routing/post.router');
const categoryRouter = require('./routing/Category.router');
const userRouter = require('./routing/User.router')

app.use('/post', postRouter);
app.use('/category', categoryRouter);
app.use('/user', userRouter);

const uri = 'mongodb://localhost/DACS2Test';

mongoose.connect(uri);
mongoose.connection.once('open', ()=>{
    app.listen(3000, ()=>{
        console.log('Server started at port 3000');
    });
});
