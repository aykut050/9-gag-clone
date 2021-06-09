const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')

router.get('/', (req, res) => {
    User.find({ _id: req.session.userId }).then(userName1 => {
        Post.find({ user: req.session.userId }).then(posts => {
            Post.find({}).then(post => {
                res.render('site2/profil', { posts: posts, userName1: userName1, post:post })
            })
        })
    })
})


module.exports = router