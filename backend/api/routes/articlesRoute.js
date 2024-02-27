const express = require('express')
const router = express.Router()

const articleController = require('../controllers/articleController')



// GET all
router.get('/', articleController.getAllArticle)

// POST new one
  router.post('/', articleController.postNewArticle)
  

// id GET 
router.get('/:id', articleController.getSingleArticle)

// id PUT
router.put('/:id', articleController.editArticle)

// id DELETE
router.delete('/:id', articleController.deleteSingleArticle)


  module.exports = router;