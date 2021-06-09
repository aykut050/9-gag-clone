const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Yorum = require('../models/Yorum')
const User = require('../models/User')


router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(post => {
        Yorum.find({ postId: req.params.id }).then(yorum => {
            User.findOne({ _id: req.session.userId }).then(user1 => {
                res.render('site2/gonderi_sayfasi', { post: post, yorum: yorum, user1: user1 })
            })
        })
    })
})

module.exports = router