const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const path = require('path')
const Category = require('../models/Category')
const User = require('../models/User')
const mongoose = require('mongoose')
const Like = require('../models/Like')
const Dislike = require('../models/Dislike')


router.get('/new', (req, res) => {
    
        Category.find({}).then(categories => {
            res.render('site2/addpost', { categories: categories })
        })
})

router.get('/category/:categoryId', (req, res) => {
    Post.find({ category: req.params.categoryId }).populate({ path: 'category', model: Category }).then(post => {
        Category.aggregate([
            {
                $lookup: {
                    from: 'posts',
                    localField: '_id',
                    foreignField: 'category',
                    as: 'posts'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    category: 1
                }
            }
        ]).then(categories => {
            res.render('site2/index', { post: post, categories: categories })
        })
    })
    console.log(req.params.categoryId)
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(post => {
        res.render('site2/index', { post: post, categories: categories })
    })
})

router.post('/like/:id', (req, res) => {
    Post.findOne({ _id: req.params.id }).then(post => {

        console.log(post.definition)
        Like.create({
            postId: req.params.id,
            userId: req.session.userId,
            definition: post.definition,
            postImage: post.postImage,
            date: post.date,

        })
        req.session.sessionFlash = {
            type: 'alert alert-success',
            message: 'Like attınız'
        }
    })
    res.redirect('/')
})

router.get('/like/:id', (req, res) => {
    User.find({ _id: req.params.id }).then(user => {
        Like.find({ userId: req.params.id }).then(like => {
            res.render('site2/profil', { userName1: user, posts: like })
        })
    })
})

router.post('/dislike/:id', (req, res) => {
    Post.findOne({ _id: req.params.id }).then(post => {

        console.log(post.definition)
        Dislike.create({
            postId: req.params.id,
            userId: req.session.userId,
            definition: post.definition,
            postImage: post.postImage,
            date: post.date,

        })
        req.session.sessionFlash = {
            type: 'alert alert-success',
            message: 'Dislike attınız'
        }
    })
    res.redirect('/')
})

router.get('/dislike/:id', (req, res) => {
    User.find({ _id: req.params.id }).then(user => {
        Dislike.find({ userId: req.params.id }).then(like => {
            res.render('site2/profil', { userName1: user, posts: like })
        })
    })
})

router.post('/test', (req, res) => {

    let post_image = req.files.postImage

    post_image.mv(path.resolve(__dirname, '../public/img/postimages', post_image.name))



    Post.create({
        ...req.body,
        postImage: `/img/postimages/${post_image.name}`,
        user: req.session.userId,
       
    })

    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: 'Postunuz başarılı bir şekilde oluşturuldu'
    }

    res.redirect('/')
})


module.exports = router