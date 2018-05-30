"use strict";
const express = require('express');
const route = express.Router();
const Post = require('../models/Post');
const bodyParser = require('body-parser');
const upload = require('../helpers/upload');
const checkToken = require('../middleware/check')

route.use(bodyParser.urlencoded({
    extended: false
}));

route.use(bodyParser.json())
// kiem tra ton tai token
// route.use(checkToken)
route.post('/add-post', upload.single('imageProduct'),(req, res) => {
    const user_id = req.userId;
    let image;
    req.file ? image = req.file.originalname : image = 'default.png';
    const { CategoryID, title, contentSmall, contentLarge, price, acreage, Tinh, Huyen, Thon_Xa } = req.body;
    Post.addPost( CategoryID, title, contentSmall, contentLarge, image, price, acreage, Tinh, Huyen, Thon_Xa, user_id ).then(result => {
        res.json({result});
    }).catch(err => res.json("Loi" + err.message));
});

route.get('/delete-post/:idPost', (req, res) => {
    const {idPost} = req.params;
    Post.removePost(idPost).then(result => {
        res.json({
            message: "success",
            data: result
        })
    }).catch(err => {
        res.json({
            message: "fail",
        })
    })
})

route.post('/update-post/:idPost',(req, res) => {
    const {idPost} = req.params;
    const { CategoryID, title, contentSmall, contentLarge, image, price, acreage, Tinh,Huyen, Thon_Xa } = req.body;   
    Post.updatePost(idPost,CategoryID, title, contentSmall, contentLarge, image, price, acreage, Tinh, Huyen, Thon_Xa )
    .then(result => {
        res.json({
            message: 'succsess',
            data: result
        })
    }).catch(err => {
        res.json({
            message: 'fail',
            data: result
        })
    })
})

// pm2
route.get('/get-list-post', async(req, res) => {
    const list_post = await Post.getListPost();
    const list_post_popular = await Post.getListPostPopular();
    res.render('index1', {test: list_post, list_popular: list_post_popular})
    // .then(result => {
    //     res.render('index1', {test: result})
    // }).catch(err => {
    //     res.json({message: 'canot_get_list'});
    // });
})

route.get('/info-post/:idPost', (req, res)=>{
    const { idPost } = req.params;
    Post.getInfoPost(idPost).then(result=>res.json(result)).catch(err=>res.json(err.message));
})

module.exports = route;