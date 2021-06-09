const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/User')

router.get('/', (req, res) => {
    Post.find({}).sort({ $natural: -1 }).then(posts => {
        Category.find({}).then(categories => {
            User.find({ _id:req.session.userId }).then(user => {
                res.render('site2/index', { post: posts, categories: categories, user: user })
            })
        })
    })
})



module.exports = router