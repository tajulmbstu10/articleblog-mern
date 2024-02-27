const ArticleModel = require('../model/ArticleModel')

// GET All contact
const getAllArticle = (req, res, next) =>{
    ArticleModel.find()
        .then(data=>{
            // res.status(200).json(contacts)
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({
                message: 'Error occured',
                err: err
            })
        })
}
// Post new contact
const postNewArticle = (req, res, next) =>{
    // console.log(req.file)
    
    const title = req.body.title
    const description = req.body.description
    
    const articleData = new ArticleModel({
        title: title,
        description: description,
    })

    articleData.save()
        .then( data => {
            res.status(201).json({
                message:'New Article added',
                data
            })
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({
                message: 'Error occured',
                err: err
            })
        })
}

// Get single contact
const getSingleArticle = (req, res, next) =>{
    const id = req.params.id
    ArticleModel.findById(id)
        .then(data =>{
            if(!data){
                return res.status(404).end()
            }
            return res.status(200).json(data)
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({
                message: 'Error occured',
                err: err
            })
        } )
}
// delete single contact
const deleteSingleArticle = (req, res, next)=>{
    const id = req.params.id
    ArticleModel.findByIdAndDelete(id)
        .then(result =>{
            if(result){
            res.json({
                message:"Article deleted",
                result
            })
        }else{
            res.json({
                message:"Article not found"
            })
        }
        })
        .catch(err =>{
            console.log(err)
            res.json({
                message:"error occured",
                error: err
            })
        })
}
// Update / edit a contact
const editArticle = (req,res,next)=>{
    const id = req.params.id
    let updatedArticle = {
        title : req.body.title,
        description : req.body.description
    }
    ArticleModel.findByIdAndUpdate(id, {$set:updatedArticle},{new:true})
        .then(data =>{
            res.json({
                message:"Updated Successfully",
                updatedArticle:data
            })
        })
        .catch(err =>{
            console.log(err)
            res.json({
                message:"error occured",
                error: err
            })
        })
}
// --------------
module.exports = {
    getAllArticle,
    postNewArticle,
    getSingleArticle,
    deleteSingleArticle,
    editArticle
}